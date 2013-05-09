MY_APP.Language = MY_APP.Model.extend({
	generic: null,

	all: function () {
		return $.extend(true, {}, this.get("generic"));
	}.property("generic")
});

MY_APP.Language.reopenClass({
	findAll: function () {
		var language = MY_APP.Language.create();

		return this.ajaxSite(
			"GET",
			"/app/languages/en/lang.json",
			{}
		).then(
			function (json) {
				if (null == json) {
					throw new Error("Error GETting Language from: " + "/app/languages/en/lang.json");
				}

				language.set("generic", json);

				return language;
			}
		);
	}
});
