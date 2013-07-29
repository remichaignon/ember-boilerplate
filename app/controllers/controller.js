MY_APP.Controller = Ember.Controller.extend({
	needs: ["application", "authenticated"],
	appBinding: "controllers.application",
	authBinding: "controllers.authenticated",
});

MY_APP.ObjectController = Ember.ObjectController.extend({
	needs: ["application", "authenticated"],
	content: null,
	app: null,
	auth: null,
	appBinding: "controllers.application",
	authBinding: "controllers.authenticated"
});

MY_APP.ArrayController = Ember.ArrayController.extend({
	needs: ["application", "authenticated"],
	content: null,
	appBinding: "controllers.application",
	authBinding: "controllers.authenticated"
});
