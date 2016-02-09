/*
 * grunt-protractor-cucumber
 * https://github.com/karthiktv006/grunt-protractor-cucumber
 *
 * Copyright (c) 2016 Karthik Viswanath
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('e2e-run', function (suite, feature, tags, browser) {
    console.log('grunt e2e-run');


    if (!grunt.file.exists('test/e2e/output')) {
      grunt.file.mkdir('test/e2e/output');
    }

    if (suite) {
      grunt.option('specs', 'test/features/' + suite + '/*.feature');
    }
    if (feature) {
      grunt.option('specs', 'test/features/' + suite + '/' + feature);
    }
    var tags;
    if (tags) {
      tags = tags.split('&&');
    }

    // if (argv.formatter) {
    //   grunt.option('cucumberOpts.format', argv.formatter);
    // }

    // _.forEach(argv, function(value, key) {
    //   if (key !== '_') {
    //     grunt.option(key, value);
    //   }
    // });

    var flags = grunt.option.flags();
    flags.unshift('e2e.conf.js');
    flags.unshift('node_modules/protractor/bin/protractor');
    if (tags) {
      for (var j = 0; j < tags.length; j++) {
        flags.push('--cucumberOpts.tags=' + tags[j]);
      }
    }
    // if (argv.browserName) {
    //   flags.push('--cucumberOpts.no-colors');
    // }

    var done = this.async();
    var ptr = grunt.util.spawn({
      cmd: 'node',
      args: flags,
      opts: {
        hello: 'hello'
      }
    }, function(error, result, code) {
      grunt.file.write('test/e2e/output/error.txt', error);
      var regexJsonFilePath = /json file is created in (.+)\n/;
      var outputFileMatch = result.stdout.match(regexJsonFilePath);
      if (outputFileMatch) {
        outputFilePath = outputFileMatch[1];
      }
      done();
    });
    ptr.stdout.pipe(process.stdout);
    ptr.stderr.pipe(process.stderr);


  });

  grunt.registerTask('e2e', 'Grunt plugin in progress', function (suite, feature, tags, browser) {
    console.log('e2e grunt task');
    var configFile = grunt.config.data.protractor_cucumber.options.configFile,
        baseTestDir = grunt.config.data.protractor_cucumber.options.baseTestDir;

    console.log(configFile, baseTestDir);

    var configuration = require(process.cwd() + '/' + configFile);

    var rerunFlag, taskString;

    suite = suite || '';
    feature = feature || '';
    tags = tags || '';
    browser = browser || '';
    taskString = 'e2e-run:' + suite + ':' + feature + ':' + tags + ':' + browser;
    // rerunFlag = argv.rerun || argv.r;

    // grunt.task.run('e2e-cleanup');
    grunt.task.run(taskString);
    // if (rerunFlag) {
    //   grunt.task.run('e2e-rerun:' + browser);
    //   grunt.task.run('stitch-json-files');
    // }
    // if (argv.html) {
    //   grunt.task.run('generateHtmlReport');
    // }



    /////////////////////////////////////////////////////////////////
    //   Below code came by default using grunt-init gruntplugin   //
    /////////////////////////////////////////////////////////////////


    // Merge task-specific and/or target-specific options with these defaults.
    // var options = this.options({
    //   punctuation: '.',
    //   separator: ', '
    // });

    // // Iterate over all specified file groups.
    // this.files.forEach(function(f) {
    //   // Concat specified files.
    //   var src = f.src.filter(function(filepath) {
    //     // Warn on and remove invalid source files (if nonull was set).
    //     if (!grunt.file.exists(filepath)) {
    //       grunt.log.warn('Source file "' + filepath + '" not found.');
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }).map(function(filepath) {
    //     // Read file source.
    //     return grunt.file.read(filepath);
    //   }).join(grunt.util.normalizelf(options.separator));

    //   // Handle options.
    //   src += options.punctuation;

    //   // Write the destination file.
    //   grunt.file.write(f.dest, src);

    //   // Print a success message.
    //   grunt.log.writeln('File "' + f.dest + '" created.');
    // });
  });

};