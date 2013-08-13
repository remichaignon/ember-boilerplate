require("dependencies/scripts/jquery-1.9.1");
require("dependencies/scripts/jquery.cookie");
require("dependencies/scripts/handlebars.runtime");
require("dependencies/scripts/ember");
require("dependencies/scripts/moment");
require("dependencies/scripts/bootstrap");
require("dependencies/compiled/templates");


window.MY_APP = Ember.Application.create({
	rootElement: "#MY_APP",

	ready: function () {
		MY_APP.LOG_STACKTRACE_ON_DEPRECATION = MY_APP.CONFIG.LOG_STACKTRACE_ON_DEPRECATION;
		MY_APP.LOG_BINDINGS = MY_APP.CONFIG.LOG_BINDINGS;
		MY_APP.LOG_TRANSITIONS = MY_APP.CONFIG.LOG_TRANSITIONS;
		MY_APP.LOG_TRANSITIONS_INTERNAL = MY_APP.CONFIG.LOG_TRANSITIONS_INTERNAL;
		MY_APP.LOG_VIEW_LOOKUPS = MY_APP.CONFIG.LOG_VIEW_LOOKUPS;
		MY_APP.LOG_ACTIVE_GENERATION = MY_APP.CONFIG.LOG_ACTIVE_GENERATION;

		Ember.$.support.cors = true;
	}
});

Ember.TextSupport.reopen({
	attributeBindings: ["required", "autofocus", "autocorrect", "autocomplete"]
});


MY_APP.deferReadiness();
MY_APP.deferReadiness();

Ember.$(document).ready(
	function () {
		MY_APP.LanguageController.getCurrent(MY_APP.CONFIG.LANG).then(
			function (language) {
				MY_APP.LANG = language;
				MY_APP.advanceReadiness();
			},
			function () {
				MY_APP.advanceReadiness();
			}
		);

		MY_APP.AuthenticatedController.getCurrent().then(
			function (authenticatedUser) {
				MY_APP.AUTH = authenticatedUser;
				MY_APP.advanceReadiness();
			},
			function () {
				MY_APP.advanceReadiness();
			}
		);
	}
);


require("app/instruments/render_performance");


require("app/mixins/alert");
require("app/mixins/google_analytics");
require("app/mixins/button_state");


require("app/models/model");
require("app/models/language");
require("app/models/error");


require("app/helpers/json");


require("app/views/modal");


require("app/controllers/controller");
require("app/controllers/application");
require("app/controllers/language");
require("app/controllers/index");

require("app/controllers/authenticated");


require("app/router");
