MY_APP.IndexRoute = MY_APP.Route.extend({
	// Events
	events: {
		error: function () {}
	},

	// Hooks
	beforeModel: function () {
		this.setup();
	}
});
