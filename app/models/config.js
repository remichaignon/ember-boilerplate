MY_APP.Config = MY_APP.Model.extend({
	api_url: null,
	api_headers: []
});

MY_APP.Config.reopenClass({
	findCurrent: function () {
		var config = true ? "dev" : "prod";

		return this.ajaxSite(
			"GET",
			"/app/data/config/" + config + ".json",
			{}
		).then(
			function (json) {
				MY_APP.LOG_TRANSITIONS = (null == json.LOG_TRANSITIONS) ? false : json.LOG_TRANSITIONS;
				MY_APP.LOG_INSTRUMENTS = (null == json.LOG_INSTRUMENTS) ? false : json.LOG_INSTRUMENTS;
				MY_APP.LOG_ALL_ERRORS = (null == json.LOG_ALL_ERRORS) ? false : json.LOG_ALL_ERRORS;

				return MY_APP.Config.create({
					api_url: json.API_URL,
					api_headers: [
						["token", json.API_TOKEN]
					]
				});
			}
		);
	}
});
