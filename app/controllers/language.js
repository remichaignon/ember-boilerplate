MY_APP.LanguageController = Ember.Controller.extend({
	// Properties
	current: null,

	// Hooks
	init: function () {
		if (null != MY_APP.LANG) {
			this.set("current", MY_APP.LANG);
			MY_APP.LANG = null;
		}
	},

	// Methods
	reset: function () {
		this.set("current", null);
	},
	changeLanguage: function (lang) {
		MY_APP.Language.find(lang).then(
			function (language) {
				this.set("current", language);
			}
		);
	}
});

MY_APP.LanguageController.reopenClass({
	getCurrent: function (lang) {
		return MY_APP.Language.find(lang ? lang : "en");
	}
});
