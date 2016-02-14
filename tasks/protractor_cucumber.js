/*
 * grunt-protractor-cucumber
 * https://github.com/karthiktv006/grunt-protractor-cucumber
 *
 * Copyright (c) 2016 Karthik Viswanath
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash'),
    argv = require('yargs').argv,
    path = require('path'),

    configFile,
    baseTestDir,
    seleniumAddress,
    configuration,
    outputDir,
    featuresDir,
    reportFormat;

module.exports = function(grunt) {

  // Grunt tasks
  grunt.registerTask('e2e', 'Run end to end test using protractor and cucumber framework.', e2e);
  grunt.registerTask('e2e-rerun', 'Rerun failed scenarios alone.', e2eRerun);
  grunt.registerTask('e2e-dry-run', 'dry-run:folder | Invokes formatters without executing the steps.', e2eDryRun);

  //////////////////// Task functions

  function e2e (suite, feature, tags, browser) {
    var rerunFlag = argv.rerun || argv.r,
        flags;

    setupConfig();

    suite = suite || '';
    feature = feature || '';
    tags = tags || '';
    browser = browser || '';

    flags = getFlagsForProtractor(suite, feature, tags, browser, {});

    var done = this.async();
    protractorRunner(flags, done);

    if (rerunFlag) {
      grunt.task.run('e2e-rerun:' + browser);
    }
  }

  function e2eRerun (browser) {
    var rerunScenarios,
        mode = {
          rerun: true
        },
        rerunReportFile = path.resolve(outputDir, reportFormat.rerun || 'rerun.txt'),
        flags;

    if (!configFile) {
      setupConfig();
    }

    rerunScenarios = grunt.file.read(rerunReportFile, 'utf8');

    if (rerunScenarios) {
      rerunScenarios = rerunScenarios.trim().split('\n');
      grunt.option('specs', rerunScenarios);
      flags = getFlagsForProtractor(null, null, null, browser, mode);
      this.async();
      protractorRunner(flags, stitchJsonFiles);
    }
  }

  function e2eDryRun (team, file) {
    var mode = {
          dryrun: true
        },
        flags;

    process.env['DRY_RUN'] = true;

    if (!configFile) {
      setupConfig();
    }

    file = file || '';
    flags = getFlagsForProtractor(team, file, null, null, mode);
    var done = this.async();
    protractorRunner(flags, done);
    // grunt.task.run('run:dry-run');
  }

  /////////////////// Private functions

  var protractorRunner = function (flags, done) {
    var ptr = grunt.util.spawn({
      cmd: 'node',
      args: flags
    }, function(error) {
      if (error) {
        grunt.file.write(path.resolve(outputDir, 'error.txt'), error);
      }
      done();
    });

    ptr.stdout.pipe(process.stdout);
    ptr.stderr.pipe(process.stderr);
  };

  var setupConfig = function () {
    // check if all are defined
    configFile = path.resolve(grunt.config.data.protractor_cucumber.configFile),
    baseTestDir = path.resolve(grunt.config.data.protractor_cucumber.baseTestDir),
    seleniumAddress = grunt.config.data.protractor_cucumber.seleniumAddress,
    configuration = require(configFile);
    outputDir = configuration.config.report.output || path.resolve('test', 'output'),
    featuresDir = path.resolve(baseTestDir,  'features');
    reportFormat = configuration.config.report.format;
  };

  var getFlagsForProtractor = function (suite, feature, tags, browser, mode) {

    if (!grunt.file.exists(outputDir)) {
      grunt.file.mkdir(outputDir);
    }

    if (suite) {
      grunt.option('specs', path.resolve(featuresDir, suite, '**/*.feature'));
    }
    if (feature) {
      grunt.option('specs', path.resolve(featuresDir, suite, '**/*', feature));
    }
    if (tags) {
      tags = tags.split('&&');
    }

    if (argv.browserName) {
      grunt.option('capabilities.browserName', argv.browserName);
      grunt.option('seleniumAddress', seleniumAddress);
    } else {
      // try modifing the protractor config rather than using directConnect
      grunt.option('directConnect', true);
      grunt.option('capabilities.browserName', browser || 'chrome');
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

    if (mode.dryrun) {
      var format = configuration.config.report.dryrunOutputFormat || 'progress';
      flags.push('--cucumberOpts.format=' + format);
      flags.push('--cucumberOpts.dry-run');
    } else {
      _.forEach(reportFormat, function (filename, formatType) {
        if (mode.rerun && formatType === 'json') {
          flags.push('--cucumberOpts.format=json:' + path.resolve(outputDir, 'rerun.json'));
        } else if (filename === 'console') {
          flags.push('--cucumberOpts.format=' + formatType);
        } else {
          flags.push('--cucumberOpts.format=' + formatType + ':' + path.resolve(outputDir, filename));
        }
      });
    }

    //TODO make no color to grunt, protractor and cucumber
    if (argv.browserName) {
      flags.push('--cucumberOpts.no-colors');
    }

    return flags;
  };

  var stitchJsonFiles = function () {
    var originalJson,
        rerunJson,
        originalElements,
        rerunElements;

    grunt.file.recurse(outputDir, function (abspath) {
      if (abspath.match(/rerun\S+json/g)) {
        rerunJson = grunt.file.readJSON(abspath);
        grunt.file.delete(abspath);
      } else if (abspath.match(/\S+.json/g)) {
        originalJson = grunt.file.readJSON(abspath);
        grunt.file.delete(abspath);
      }
    });

    originalElements = _.flatten(_.map(originalJson, 'elements'));
    rerunElements = _.flatten(_.map(rerunJson, 'elements'));

    _.forEach(rerunElements, function (rerunElement) {
      var match = _.find(originalElements, function (originalElement) {
        return originalElement.id === rerunElement.id;
      });
      if (match) {
        var index = _.indexOf(originalElements, match);
        originalElements.splice(index, 1, rerunElement);
      }
    });

    _.forEach(originalJson, function (feature) {
      _.forEach(feature.elements, function (scenario) {
        scenario.steps = _.find(originalElements, function (originalElement) {
          return originalElement.id === scenario.id;
        }).steps;
      });
    });

    grunt.file.write(path.resolve(outputDir, reportFormat.json), JSON.stringify(originalJson, null, 2), {encoding: 'utf8'});

  };

};
