MY_APP.Route = Ember.Route.extend({
	// Events
	events: {
		// ATTENTION: If you have other events in your route, make sure to copy this error event.
		error: function (errorObject) {
			MY_APP.Error.handle(errorObject, this.controllerFor("authenticated"));
		},
	},

	// Hooks
	beforeModel: function () {
		var auth = this.controllerFor("authenticatedUser");

		if (auth.isValid()) {
			this.transitionTo("index");
		}
	}
});

MY_APP.LoadingRoute = Ember.Route.extend({});