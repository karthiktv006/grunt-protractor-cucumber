/*
 * grunt-protractor-cucumber
 * https://github.com/karthiktv006/grunt-protractor-cucumber
 *
 * Copyright (c) 2016 Karthik Viswanath
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.loadTasks('tasks');

	grunt.initConfig({
		eslint: {
			options: {
				configFile: '.eslintrc.js',
				format: 'table'
			},
			target: [

				'tasks/**/*.js',
				'test/**/*.js',
				'*.js'

			]
		},
		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}
	});

	grunt.registerTask('lint', ['eslint']);
	grunt.registerTask('test', ['nodeunit']);

};