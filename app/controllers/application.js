MY_APP.ApplicationController = Ember.Controller.extend(MY_APP.GoogleAnalytics, {
	// Properties
	needs: ["language", "authenticated"],
	langBinding: "controllers.language",
	authBinding: "controllers.authenticated",

	attemptedTransition: null,

	// Events
	logout: function () {
		this.auth.reset();
	},

	// Methods
	reset: function () {
		this.set("attemptedTransition", null);
	}
});
