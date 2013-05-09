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
				if (null == json) {
					throw new Error("Error GETing the Config file from: " + "/app/data/config/" + config + ".json");
				}

				if (json.LOG_TRANSITIONS) {
					MY_APP.LOG_TRANSITIONS = true;
				}
				if (json.LOG_INSTRUMENTS) {
					MY_APP.LOG_INSTRUMENTS = true;
				}

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
