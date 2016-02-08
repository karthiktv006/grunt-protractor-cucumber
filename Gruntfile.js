/*
 * grunt-protractor-cucumber
 * https://github.com/karthiktv006/grunt-protractor-cucumber
 *
 * Copyright (c) 2016 Karthik Viswanath
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.loadTasks('tasks');






  /////////////////////////////////////////////////////////////////
  //   Below code came by default using grunt-init gruntplugin   //
  /////////////////////////////////////////////////////////////////
  // Project configuration.
  // grunt.initConfig({
  //   jshint: {
  //     all: [
  //       'Gruntfile.js',
  //       'tasks/*.js',
  //       '<%= nodeunit.tests %>'
  //     ],
  //     options: {
  //       jshintrc: '.jshintrc'
  //     }
  //   },

  //   // Before generating any new files, remove any previously-created files.
  //   clean: {
  //     tests: ['tmp']
  //   },

  //   // Configuration to be run (and then tested).
  //   e2e: {
  //     default_options: {
  //       options: {
  //       },
  //       files: {
  //         'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
  //       }
  //     },
  //     custom_options: {
  //       options: {
  //         separator: ': ',
  //         punctuation: ' !!!'
  //       },
  //       files: {
  //         'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
  //       }
  //     }
  //   },

  //   // Unit tests.
  //   nodeunit: {
  //     tests: ['test/*_test.js']
  //   }

  // });

  // Actually load this plugin's task(s).

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // // plugin's task(s), then test the result.
  // grunt.registerTask('test', ['clean', 'protractor_cucumber', 'nodeunit']);

  // // By default, lint and run all tests.
  // grunt.registerTask('default', ['jshint', 'test']);

};