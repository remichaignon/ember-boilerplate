MY_APP.Route = Ember.Route.extend({
	redirect: function () {
		var applicationController = this.controllerFor("application");

		applicationController.set("targetRoute", this.routeName);
		applicationController.set("targetModel", this.currentModel);

		if (!applicationController.get("isSetup")) {
			this.transitionTo("doSetup");
		}
	},
	redirectToTargetRoute: function () {
		var applicationController = this.controllerFor("application");

		var targetRoute = applicationController.get("targetRoute") || "index";
		var targetModel = applicationController.get("targetModel");

		applicationController.set("targetRoute", null);
		applicationController.set("targetModel", null);

		if (targetModel) {
			this.transitionTo(targetRoute, targetModel);
		}
		else {
			this.transitionTo(targetRoute);
		}
	},

	errorHandlerBuilder: function (customErrorHandler) {
		return function (errorObject) {
			var error = MY_APP.Error.create(errorObject);

			customErrorHandler(error);
		};
	},
	genericErrorHandler: function (errorObject) {
		var error = MY_APP.Error.create(errorObject);

		throw new Error("Could not handle error. (code: " + error.get("code") + ", message: " + error.get("message"));
	},
});
