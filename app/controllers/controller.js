MY_APP.Controller = Ember.Controller.extend({
	needs: ["application", "language", "authenticated"],
	appBinding: "controllers.application",
	langBinding: "controllers.language",
	authBinding: "controllers.authenticated",
});

MY_APP.ObjectController = Ember.ObjectController.extend({
	needs: ["application", "language", "authenticated"],
	content: null,
	app: null,
	lang: null,
	auth: null,
	appBinding: "controllers.application",
	langBinding: "controllers.language",
	authBinding: "controllers.authenticated"
});

MY_APP.ArrayController = Ember.ArrayController.extend({
	needs: ["application", "language", "authenticated"],
	content: null,
	appBinding: "controllers.application",
	langBinding: "controllers.language",
	authBinding: "controllers.authenticated"
});
