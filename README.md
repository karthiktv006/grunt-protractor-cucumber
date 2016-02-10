# grunt-protractor-cucumber

> Grunt runner for protractor using cucumber framework

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-protractor-cucumber --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-protractor-cucumber');
```

## The "protractor_cucumber" task

### Overview
In your project's Gruntfile, add a section named `protractor_cucumber` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  protractor_cucumber: {
      options: {
        // Task-specific options go here.
    }
  }
});
```

### Options

#### options.configFile
Type: `String`
Default value: `'e2e.conf.js'`

A string value that is used to point the location of config file (similar pattern to protractor config)

#### options.baseTestDir
Type: `String`
Default value: `'test'`

A string value that is used to locate the test directory which will be used through grunt task as base to look for specs

### Usage Examples
#### Custom Options
In this example, you define the location of config file and base test directory inside `grunt.initConfig` block. Rest of the configuration which are related to protractor/cucumber/app should be defined inside `e2e.conf.js` file

```js
grunt.initConfig({
  protractor_cucumber: {
      options: {
        configFile: 'e2e.conf.js',
        baseTestDir: 'test'
    }
  }
});
```

## Execution CLI
`grunt e2e:<folder>:<feature_name>:<tag>:<browser> --browserName=<browser_name>`

### Sample project
Refer https://github.com/karthiktv006/grunt-protractor-cucumber-examples

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
Refer https://github.com/karthiktv006/grunt-protractor-cucumber/releases
