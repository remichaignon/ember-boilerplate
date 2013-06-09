MY_APP.DoSetupRoute = MY_APP.Route.extend({
	redirect: function () {
		var that = this;

		MY_APP.Config.findCurrent().then(
			function (config) {
				MY_APP.CONFIG = config;

				MY_APP.Language.findAll().then(
					function (language) {
						that.controllerFor("application").set("language", language);
						that.controllerFor("application").set("isSetup", true);

						that.redirectToTargetRoute();
					},
					that.errorHandlerBuilder(
						function () {
							that.transitionTo("fourOhFour");
							throw new Error("Language file missing or invalid.");
						}
					)
				);
			},
			that.errorHandlerBuilder(
				function () {
					that.transitionTo("fourOhFour");
					throw new Error("Config file missing or invalid.");
				}
			)
		);
	}
});
