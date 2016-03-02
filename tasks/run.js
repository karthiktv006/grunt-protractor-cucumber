'use strict';

var path = require('path');
var webdriverManager;

module.exports = function (grunt) {

	grunt.registerTask('run', function (command) {
		var done = this.async();

		switch (command) {
			case 'update-selenium':
				updateSelenium(done);
				break;

			case 'update-selenium-ie':
				updateSeleniumIe(done);
				break;

			case 'start-selenium':
				startSelenium(done);
				break;

			case 'update-start-selenium':
				updateSelenium(startSelenium);
				break;

			default:
				grunt.log.warn('hello');
		}
	});

	var updateSelenium = function (done) {
		nodeCommandRunner([getWebdriverManager(), 'update', '--ignore_ssl'], done);
	};

	var startSelenium = function (done) {
		nodeCommandRunner([getWebdriverManager(), 'start'], done);
	};

	var updateSeleniumIe = function (done) {
		nodeCommandRunner([getWebdriverManager(), 'update', '--ie', '--ignore_ssl'], done);
	};

	var nodeCommandRunner = function (flags, done) {
    var runner = grunt.util.spawn({
      cmd: 'node',
      args: flags
    }, function() {
      done();
    });

    runner.stdout.pipe(process.stdout);
    runner.stderr.pipe(process.stderr);
	};

  var getWebdriverManager = function () {
    if (webdriverManager) {
      return webdriverManager;
    }
    var result = require.resolve('protractor');
    if (result) {
      webdriverManager = path.resolve(path.join(path.dirname(result), '..', 'bin', 'webdriver-manager'));
      return webdriverManager;
    }
    throw new Error('No protractor installation found.');
  };

};