MY_APP.Error = Ember.Object.extend({
	// Properties
	xhr: null,

	// Hooks
	init: function () {
		if (MY_APP.LOG_ALL_ERRORS) {
			console.log("Error created - " + this.get("xhr"));
		}
	}
});

MY_APP.Error.reopenClass({
	handle: function (errorObject, auth, customHandler) {
		var error = MY_APP.Error.create(errorObject);

		if (error.isCookieError()) {
			auth.transitionToRoute("index");
			return;
		}

		if ("function" === typeof customHandler) {
			customHandler(error);
			return;
		}

		throw new Error("Could not handle error. " + errorObject);
	},
	handler: function (auth, customHandler) {
		return function (errorObject) {
			var error = MY_APP.Error.create(errorObject);

			if (error.isCookieError()) {
				auth.transitionToRoute("index");
				return;
			}

			if ("function" === typeof customHandler) {
				customHandler(error);
				return;
			}

			throw new Error("Could not handle error. " + errorObject);
		};
	}
});
