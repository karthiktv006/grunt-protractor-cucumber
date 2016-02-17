// 'use strict';

// module.exports = function (grunt) {

// 	grunt.registerTask('run', function (command) {
// 		var flags;

// 		switch (command) {
// 			case 'update-selenium':
// 				flags = path.resolve(__dirname, '..', 'node_modules/protractor/bin/protractor')

// 			case 'update-selenium-ie':

// 			case 'start-selenium':

// 			case 'update-start-selenium':

// 			default:
// 				grunt.log.warn('hello');
// 		}
// 	});

// 	var nodeCommandRunner = function (flags, done) {
//     var runner = grunt.util.spawn({
//       cmd: 'node',
//       args: flags
//     }, function() {
//       done();
//     });

//     runner.stdout.pipe(process.stdout);
//     runner.stderr.pipe(process.stderr);
// 	};

//   grunt.config('run', {
//     'update-selenium': {
//       cmd: 'node',
//       args: [
//         'node_modules/protractor/bin/webdriver-manager',
//         'update',
//         '--ignore_ssl'
//       ],
//       options: {
//         passArgs: [
//           'proxy'
//         ]
//       }
//     },
//     'update-selenium-ie': {
//       cmd: 'node',
//       args: [
//         'node_modules/protractor/bin/webdriver-manager',
//         'update',
//         '--ie',
//         '--ignore_ssl'
//       ],
//       options: {
//         passArgs: [
//           'proxy'
//         ]
//       }
//     },
//     'start-selenium': {
//       cmd: 'node',
//       options: {
//         wait: true
//       },
//       args: [
//         'node_modules/protractor/bin/webdriver-manager',
//         'start'
//       ]
//     },
//     'start-cucumber-sandwich': {
//       exec: 'java -jar cucumber-sandwich.jar -f test/e2e/output/ -o test/e2e/report/'
//     },

//     'update-start-selenium': {
//       exec: 'node node_modules/protractor/bin/webdriver-manager update --ignore_ssl' +
//         '&& node node_modules/protractor/bin/webdriver-manager start'
//     }
//   });
// };