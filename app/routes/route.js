MY_APP.Route = Ember.Route.extend({
	redirect: function () {
		this.controllerFor("application").set("targetRoute", this.routeName);
		this.controllerFor("application").set("targetModel", this.currentModel);

		if (!this.controllerFor("application").get("isSetup")) {
			this.transitionTo("doSetup");
			return;
		}

		this.controllerFor("application").set("targetRoute", null);
		this.controllerFor("application").set("targetModel", null);

		this.transitionTo("index");
	}
});
