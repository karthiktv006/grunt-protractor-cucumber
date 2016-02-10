/*
 * grunt-protractor-cucumber
 * https://github.com/karthiktv006/grunt-protractor-cucumber
 *
 * Copyright (c) 2016 Karthik Viswanath
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var argv = require('yargs').argv;
var configFile,
    baseTestDir,
    seleniumAddress,
    configuration,
    outputDir,
    featuresDir;

module.exports = function(grunt) {

  grunt.registerTask('e2e', 'Grunt plugin in progress', function (suite, feature, tags, browser) {
    var rerunFlag = argv.rerun || argv.r,
        taskString;

    setupConfig();

    suite = suite || '';
    feature = feature || '';
    tags = tags || '';
    browser = browser || '';
    taskString = 'e2e-run:' + suite + ':' + feature + ':' + tags + ':' + browser;

    var flags = getFlagsForProtractor(suite, feature, tags, browser);

    var done = this.async();
    protractorRunner(flags, done);

    if (rerunFlag) {
      grunt.task.run('e2e-rerun:' + browser);
      // grunt.task.run('stitch-json-files');
    }

  });

  grunt.registerTask('e2e-rerun', 'Rerun failed scenarios alone', function (browser) {
    var rerunScenarios, taskString;
    if (!configFile) {
      setupConfig();
    }
    process.env['RERUN'] = true;
    rerunScenarios = grunt.file.read(outputDir + '/rerun.txt', 'utf8');
    if (rerunScenarios) {
      rerunScenarios = rerunScenarios.trim().split('\n');
      grunt.option('specs', rerunScenarios);
      // taskString = 'e2e-run:' + (!!browser ? '::::' + browser : '');
      var flags = getFlagsForProtractor();
      console.log('flags', flags);
      var done = this.async();
      protractorRunner(flags, done);
      // grunt.task.run(taskString);
    }
  });

  grunt.registerTask('e2e-dry-run', 'dry-run:team | Invokes formatters without executing the steps.', function (team, file) {
    process.env['DRY_RUN'] = true;
    file = file || '';
    grunt.task.run('e2e-run:' + team + ':' + file);
    grunt.task.run('run:dry-run');
  });


  grunt.registerTask('e2e-cleanup', 'Remove files from output folder', function () {
    if (grunt.file.exists('test/output')) {
      grunt.file.delete('test/output');
    }
  });

  var protractorRunner = function (flags, done) {
    var ptr = grunt.util.spawn({
      cmd: 'node',
      args: flags
    }, function(error, result, code) {
      if (error) {
        grunt.file.write(outputDir + '/error.txt', error);
      }
      done();
    });

    ptr.stdout.pipe(process.stdout);
    ptr.stderr.pipe(process.stderr);
  };

  var setupConfig = function () {
    // check if all are defined
    configFile = grunt.config.data.protractor_cucumber.options.configFile,
    baseTestDir = grunt.config.data.protractor_cucumber.options.baseTestDir,
    seleniumAddress = grunt.config.data.protractor_cucumber.options.seleniumAddress,
    configuration = require(process.cwd() + '/' + configFile);
    outputDir = configuration.config.report.output || 'test/output',
    featuresDir = baseTestDir + '/features';
  };

  var getFlagsForProtractor = function (suite, feature, tags, browser) {

    if (!grunt.file.exists(outputDir)) {
      grunt.file.mkdir(outputDir);
    }

    if (suite) {
      grunt.option('specs', featuresDir + suite + '/*.feature');
    }
    if (feature) {
      grunt.option('specs', featuresDir + suite + '/' + feature);
    }
    var tags;
    if (tags) {
      tags = tags.split('&&');
    }

    if (argv.browserName) {
      grunt.option('capabilities.browserName', argv.browserName);
      grunt.option('seleniumAddress', seleniumAddress);
    } else if (browser) {
      // try modifing the protractor config rather than using directConnect
      grunt.option('directConnect', true);
      grunt.option('capabilities.browserName', browser);
    }

    if (argv.seleniumAddress) {
      grunt.option('seleniumAddress', argv.seleniumAddress);
    }

    if (argv.platform) {
     grunt.option('capabilities.platform', argv.platform);
    }


    _.forEach(argv, function(value, key) {
      if (key !== '_') {
        grunt.option(key, value);
      }
    });

    var flags = grunt.option.flags();
    flags.unshift(configFile);
    flags.unshift('node_modules/protractor/bin/protractor');
    if (tags) {
      for (var j = 0; j < tags.length; j++) {
        flags.push('--cucumberOpts.tags=' + tags[j]);
      }
    }

    if (configuration.config.report) {
      _.forEach(configuration.config.report.format, function (filename, formatType) {
        flags.push('--cucumberOpts.format=' + formatType + ':' + outputDir + '/' + filename);
      });
    }

    //TODO make no color to grunt, protractor and cucumber
    if (argv.browserName) {
      flags.push('--cucumberOpts.no-colors');
    }

    return flags;
  };

};