// 'use strict';

// module.exports = function (grunt) {
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