/*global module:false */
/*jshint camelcase:false */
module.exports = function (grunt) {

	grunt.initConfig({
		/*
			A simple ordered concatenation strategy.
			This will start at app/app.js and begin
			adding dependencies in the correct order
			writing their string contents into
			"MY_APP.js"

			Additionally it will wrap them in evals
			with @ sourceURL statements so errors, log
			statements and debugging will reference
			the source files by line number.

			You would set this option to false for
			production.
		*/
		neuter: {
			dev: {
				options: {
					includeSourceURL: true
				},
				files: { "MY_APP.js": ["app/app.js"] }

			},
			dist: {
				options: {
					includeSourceURL: false
				},
				files: { "MY_APP.js": ["app/app.js"] }
			}
		},

		/*
			Finds Handlebars templates and precompiles them into functions.
			The provides two benefits:

			1. Templates render much faster
			2. We only need to include the handlebars-runtime microlib
				and not the entire Handlebars parser.

			Files will be written out to dependencies/compiled/templates.js
			which is required within the project files so will end up
			as part of our application.

			The compiled result will be stored in
			Ember.TEMPLATES keyed on their file path (with the "app/templates" stripped)
		*/
		ember_templates: {
			options: {
				templateName: function (sourceFile) {
					return sourceFile.replace(/app\/templates\//, "");
				}
			},
			"dependencies/compiled/templates.js": ["app/templates/**/*.hbs"]
		},

		/*
			Reads the projects .jshintrc file and applies coding
			standards. Doesn't lint the dependencies or test
			support files.
		*/
		jshint: {
			all: [
				"Gruntfile.js",
				"app/**/*.js",
				"test/**/*_test.js",
				"!dependencies/*.*",
				"!test/support/*.*"
			],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		/*
			Watch files for changes.

			Changes in dependencies/ember.js or application javascript
			will trigger the neuter task.

			Changes to any templates will trigger the ember_templates
			task (which writes a new compiled file into dependencies/)
			and then neuter all the files again.
		*/
		watch: {
			markup: {
				files: ["app/app.html"],
				tasks: ["htmlmin:dev"]
			},
			scripts: {
				files: [
					"dependencies/ember*.js",
					"app/*.js",
					"app/**/*.js",
					"app/**/**/*.js"
				],
				tasks: ["neuter:dev"]
			},
			styles: {
				files: [
					"dependencies/*.less",
					"dependencies/**/*.less",
					"app/**/*.less"
				],
				tasks: ["less:dev"]
			},
			templates: {
				files: ["app/**/*.hbs"],
				tasks: ["ember_templates"]
			}
		},

		/*
			Runs all .html files found in the test/ directory through PhantomJS.
			Prints the report in your terminal.
		*/
		qunit: {
			all: ["test/**/*.html"]
		},

		/*
			Find all the <whatever>_test.js files in the test folder.
			These will get loaded via script tags when the task is run.
			This gets run as part of the larger "test" task registered
			below.
		*/
		build_test_runner_file: {
			all: ["test/**/*_test.js"]
		},

		/*
			Compile all LESS files into a large CSS file.
		 */
		less: {
			dev: {
				options: {
					paths: ["app/styles"],
					strictImports: true
				},
				files: {
					"MY_APP.css": "app/styles/master.less"
				}
			},
			dist: {
				options: {
					paths: ["app/styles"],
					strictImports: true,
					yuicompress: true
				},
				files: {
					"MY_APP.css": "app/styles/master.less"
				}
			}
		},

		/*
			Copy and minify the main html file.
		 */
		htmlmin: {
			dev: {
				files: {
					"index.html": "app/app.html"
				}
			},
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					"index.html": "app/app.html"
				}
			}
		},

		/*
			Minify and obfuscate the MY_APP.js file
		 */
		uglify: {
			dist: {
				files: {
					"MY_APP.js": ["MY_APP.js"]
				}
			}
		},

		/*
			Append a unique hash to the end of a filename for cache busting
		*/
		hashres: {
			options: {
				encoding: "utf8",
				fileNameFormat: "${name}.${ext}?v=${hash}",
				renameFiles: false
			},
			dist: {
				src: ["MY_APP.js","MY_APP.css"],
				dest: "index.html"
			}
		}
	});

	grunt.loadNpmTasks("grunt-neuter");
	grunt.loadNpmTasks("grunt-ember-templates");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-htmlmin");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-hashres");

	/*
		A task to build the test runner html file that get place in
		/test so it will be picked up by the qunit task. Will
		place a single <script> tag into the body for every file passed to
		its coniguration above in the grunt.initConfig above.
	*/
	grunt.registerMultiTask("build_test_runner_file", "Creates a test runner file.", function () {
		var tmpl = grunt.file.read("test/support/runner.html.tmpl");
		var renderingContext = {
			data: {
				files: this.filesSrc.map(function (fileSrc) {
					return fileSrc.replace("test/", "");
				})
			}
		};
		grunt.file.write("test/runner.html", grunt.template.process(tmpl, renderingContext));
	});

	/*
		Application Default task. Compiles templates, neuters application code, and begins
		watching for changes.
	*/
	grunt.registerTask("default", ["ember_templates", "neuter:dev", "less:dev", "htmlmin:dev", "watch"]);

	/*
		Application Development task. Compiles templates, neuters application code, lint
		the result, compile LESS into regular CSS, copy HTML.
	*/
	grunt.registerTask("dev", ["ember_templates", "neuter:dev", "jshint", "less:dev", "htmlmin:dev"]);

	/*
		Application Distribution task. Compiles templates, neuters application code, lint
		the result, compile LESS into minified CSS, minify HTML, obfuscate code, and add a hash to bust the cache.
	*/
	grunt.registerTask("dist", ["ember_templates", "neuter:dist", "jshint", "less:dist", "htmlmin:dist", "uglify:dist", "hashres:dist"]);

	/*
		A task to run the application's unit tests via the command line.
		It will
			- convert all the handlebars templates into compile functions
			- combine these files + application files in order
			- lint the result
			- build an html file with a script tag for each test file
			- headlessy load this page and print the test runner results
	*/
	grunt.registerTask("test", ["ember_templates", "neuter:dev", "jshint", "less:dev", "htmlmin:dev", "build_test_runner_file", "qunit"]);
};
