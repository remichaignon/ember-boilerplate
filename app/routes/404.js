MY_APP.FourOhFourRoute = MY_APP.Route.extend({
	redirect: function () {},

	model: function (params) {
		return params.unknown_path;
	},

	renderTemplate: function () {
		this.render("404");
	}
});
