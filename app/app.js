require("dependencies/scripts/jquery-1.9.1");
require("dependencies/scripts/handlebars.runtime");
require("dependencies/scripts/ember");
require("dependencies/scripts/moment");
require("dependencies/scripts/bootstrap");
require("dependencies/compiled/templates");


window.MY_APP = Ember.Application.create({
	rootElement: window.TESTING ? "#MY_APP-testing" : "#MY_APP",

	ready: function () {
		MY_APP.LOG_TRANSITIONS = MY_APP.CONFIG.LOG_TRANSITIONS;
		MY_APP.LOG_VIEW_LOOKUPS = MY_APP.CONFIG.LOG_VIEW_LOOKUPS;
		MY_APP.LOG_ACTIVE_GENERATION = MY_APP.CONFIG.LOG_ACTIVE_GENERATION;

		$.support.cors = true;
	}
});


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
require("app/controllers/index");

require("app/controllers/authenticated");


require("app/router");
