'use strict';

module.exports = function (grunt) {

	grunt.config('eslint', {
		options: {
			configFile: '.eslintrc.js',
			format: 'table'
		},
		target: [

			'tasks/**/*.js',
			'spec/**/*.js',
			'*.js'

		]
	});

};