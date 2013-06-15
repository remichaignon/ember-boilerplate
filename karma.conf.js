/* global basePath:true */
/* global files:true */
/* global exclude:true */
/* global reporters:true */
/* global port:true */
/* global runnerPort:true */
/* global colors:true */
/* global logLevel:true */
/* global autoWatch:true */
/* global browsers:true */
/* global captureTimeout:true */
/* global singleRun:true */
/* global MOCHA:true */
/* global MOCHA_ADAPTER:true */
/* global LOG_DEBUG:true */
/* jshint camelcase:false */

// Karma configuration
// Generated on Wed Apr 10 2013 14:28:11 GMT-0600 (MDT)


// base path, that will be used to resolve files and exclude
basePath = "";


// list of files / patterns to load in the browser
files = [
	MOCHA,
	MOCHA_ADAPTER,
	"MY_APP.css",
	"MY_APP.js",
	"index.html",
	"tests/app/*.js"
];


// list of files to exclude
exclude = [
	"test/*.js",
	"test/**/*.js",
	"node_modules/*",
	"sites/**/*.js"
];


// test results reporter to use
// possible values: "dots", "progress", "junit"
reporters = ["progress"];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_DEBUG;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ["Chrome", "Firefox", "Safari", "PhantomJS", "Opera"];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
