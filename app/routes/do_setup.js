MY_APP.DoSetupRoute = MY_APP.Route.extend({
	redirect: function () {
		var that = this;

		MY_APP.Config.findCurrent().then(
			function (config) {
				MY_APP.CONFIG = config;

				MY_APP.Language.findAll().then(
					function (language) {
						var targetRoute = that.controllerFor("application").get("targetRoute") || "index";
						var targetModel = that.controllerFor("application").get("targetModel");

						that.controllerFor("application").set("targetRoute", null);
						that.controllerFor("application").set("targetModel", null);
						that.controllerFor("application").set("language", language);
						that.controllerFor("application").set("isSetup", true);

						if (targetModel) {
							that.transitionTo(targetRoute, targetModel);
						}
						else {
							that.transitionTo(targetRoute);
						}
					}
				);
			}
		);
	}
});
