MY_APP.Route = Ember.Route.extend({
	// Events
	events: {
		// ATTENTION: If you have other events in your route, make sure to copy this error event.
		//error: function (errorObject, transition) {
		error: function () {
			// Handle errors
		}
	},

	// Hooks
	beforeModel: function () {
		return this.setupRoute();
	},

	// Methods
	setupRoute: function () {
		var that = this;

		var applicationController = this.controllerFor("application");

		return applicationController.getLanguage().then(
			function () {
				return that.controllerFor("authenticated").tryToAuthenticate();
			}
		);
	}
});

MY_APP.LoadingRoute = Ember.Route.extend({});