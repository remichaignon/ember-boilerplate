MY_APP.ApplicationController = Ember.Controller.extend(MY_APP.GoogleAnalytics, {
	// Properties
	needs: ["authenticated"],
	authBinding: "controllers.authenticated",

	language: null,

	attemptedTransition: null,

	// Events
	logout: function () {
		this.auth.reset();
	},

	// Methods
	reset: function () {
		this.set("attemptedTransition", null);
	},
	getLanguage: function () {
		var that = this;

		if (this.get("language")) {
			return MY_APP.Model.asResolvedPromise(this.get("language"));
		}

		return MY_APP.Language.findAll().then(
			function (language) {
				that.set("language", language);
				return that.get("language");
			}
		);
	}
});