MY_APP.Language = MY_APP.Model.extend({});

MY_APP.Language.reopenClass({
	find: function (lang) {
		return this.ajaxSite(
			"GET",
			"/app/languages/" + lang + "/lang.json",
			{}
		).then(
			function (response) {
				return MY_APP.Language.create(response);
			}
		);
	}
});
