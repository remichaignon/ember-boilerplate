/* global module:false */

module.exports = function (grunt) {

	grunt.initConfig({
		/*
			Copy and minify the main html file.
		 */
		htmlmin: {
			dev: {
				files: {
					"index.html": "index.html"
				}
			},
			prod: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					"index.html": "index.html"
				}
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
		emberTemplates: {
			options: {
				templateName: function (sourceFile) {
					return sourceFile.replace(/app\/templates\//, "");
				}
			},
			"dependencies/compiled/templates.js": ["app/templates/**/*.hbs"]
		},

		/*
			Inject javascript into index.html when required (used to add some scripts only in production builds)
		*/
		template: {
			dev: {
				options: {
					data: {
						googleanalytics: ""
					}
				},
				files: {
					"index.html": ["app/app.html.tpl"]
				}
			},
			prod: {
				options: {
					data: {
						googleanalytics: "<script>(function(i,s,o,g,r,a,m){i[\"GoogleAnalyticsObject\"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,\"script\",\"//www.google-analytics.com/analytics.js\",\"ga\");ga(\"create\", \"UA-XXXXXXXX-X\");ga(\"send\", \"pageview\");</script>"
					}
				},
				files: {
					"index.html": ["app/app.html.tpl"]
				}
			}
		},

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
				files: { "MY_APP.js": ["app/app.js", "app/data/configs/dev.js"] }

			},
			prod: {
				options: {
					includeSourceURL: false
				},
				files: { "MY_APP.js": ["app/app.js", "app/data/configs/prod.js"] }
			}
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
			prod: {
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
			Watch files for changes.

			Changes in dependencies/ember.js or application javascript
			will trigger the neuter task.

			Changes to any templates will trigger the ember_templates
			task (which writes a new compiled file into dependencies/)
			and then neuter all the files again.
		*/
		watch: {
			templates: {
				files: ["app/**/*.hbs"],
				tasks: ["emberTemplates", "neuter:dev"]
			},
			markup: {
				files: ["app/app.html.tpl"],
				tasks: ["template:dev", "htmlmin:dev"]
			},
			scripts: {
				files: [
					"dependencies/*.js",
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
			test: {
				files: [
					"test/*.js",
					"test/**/*.js",
					"test/**/**/*.js"
				],
				tasks: ["buildTestRunnerFile"]
			}
		},


		/*
			Minify and obfuscate the MY_APP.js file
		 */
		uglify: {
			prod: {
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
			prod: {
				src: ["MY_APP.js","MY_APP.css"],
				dest: "index.html"
			}
		},


		/*
			Find all the <whatever>_test.js files in the test folder.
			These will get loaded via script tags when the task is run.
			This gets run as part of the larger "test" task registered
			below.
		*/
		buildTestRunnerFile: {
			all: ["test/**/*_test.js"]
		},

		/*
			Runs test.html file through PhantomJS.
			Prints the report in your terminal.
		*/
		qunit: {
			all: ["test.html"]
		}
	});

	grunt.loadNpmTasks("grunt-contrib-htmlmin");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-ember-templates");
	grunt.loadNpmTasks("grunt-hashres");
	grunt.loadNpmTasks("grunt-neuter");
	grunt.loadNpmTasks("grunt-template");

	/*
		A task to build the test runner html file that get place in
		/test so it will be picked up by the qunit task. Will
		place a single <script> tag into the body for every file passed to
		its coniguration above in the grunt.initConfig above.
	*/
	grunt.registerMultiTask("buildTestRunnerFile", "Creates a test runner file.", function () {
		var template = grunt.file.read("test/support/runner.html.tpl");
		var renderingContext = {
			data: {
				files: this.filesSrc.map(function (fileSrc) {
					return fileSrc;
				})
			}
		};
		grunt.file.write("test.html", grunt.template.process(template, renderingContext));
	});

	/*
		Application Default task. Compiles templates, neuters application code, and begins
		watching for changes.
	*/
	grunt.registerTask("default", ["emberTemplates", "template:dev", "neuter:dev", "less:dev", "htmlmin:dev", "watch"]);

	/*
		Application Development task. Compiles templates, neuters application code, lint
		the result, compile LESS into regular CSS, copy HTML.
	*/
	grunt.registerTask("dev", ["emberTemplates", "template:dev", "neuter:dev", "jshint", "less:dev", "htmlmin:dev"]);

	/*
		Application Production task. Compiles templates, neuters application code, lint
		the result, compile LESS into minified CSS, minify HTML, obfuscate code, and add a hash to bust the cache.
	*/
	grunt.registerTask("prod", ["emberTemplates", "template:prod", "neuter:prod", "jshint", "less:prod", "htmlmin:prod", "uglify:prod", "hashres:prod"]);

	/*
		A task to run the application's unit tests via the command line.
		It will
			- convert all the handlebars templates into compile functions
			- combine these files + application files in order
			- lint the result
			- build an html file with a script tag for each test file
			- headlessy load this page and print the test runner results
	*/
	grunt.registerTask("test", ["emberTemplates", "template:dev", "neuter:prod", "jshint", "less:dev", "htmlmin:dev", "buildTestRunnerFile", "qunit"]);
};
