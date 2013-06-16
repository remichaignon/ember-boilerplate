require("dependencies/scripts/jquery-1.9.1");
require("dependencies/scripts/handlebars.runtime");
require("dependencies/scripts/ember");
require("dependencies/scripts/moment");
require("dependencies/scripts/bootstrap");
require("dependencies/compiled/templates");


window.MY_APP = Ember.Application.create({
	rootElement: window.TESTING ? "#MY_APP-testing" : "#MY_APP",

	ready: function () {
		Ember.ObjectController.reopen({ needs: ["application"] });
		Ember.ArrayController.reopen({ needs: ["application"] });
		Ember.Controller.reopen({ needs: ["application"] });

		$.support.cors = true;

		if (window.TESTING) {
			QUnit.start();
		}
	}
});


if (window.TESTING) {
	MY_APP.setupForTesting();
	MY_APP.injectTestHelpers();

	MY_APP.advanceReadiness();
}


require("app/instruments/render_performance");


require("app/models/model");
require("app/models/config");
require("app/models/language");
require("app/models/error");


require("app/helpers/json");


require("app/views/modal");


require("app/controllers/application");
require("app/controllers/index");


require("app/router");
