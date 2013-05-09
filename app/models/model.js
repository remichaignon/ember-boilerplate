MY_APP.Model = Ember.Object.extend({});

MY_APP.Model.reopenClass({
	ajaxAPI: function (type, url, args) {
		args.type = type;
		args.url = MY_APP.CONFIG.get("api_url") + url;
		args.dataType = "json";
		args.contentType = "application/json; charset=utf-8";

		if (args.data && type !== "GET") {
			args.data = JSON.stringify(args.data);
		}

		var headers = MY_APP.CONFIG.get("api_headers");

		args.beforeSend = function (xhr) {
			for (var i = 0; i < headers.length; i++) {
				xhr.setRequestHeader(headers[i][0], headers[i][1]);
			}
		};

		return $.ajax(args);
	},

	ajaxSite: function (type, url, args) {
		args.type = type;
		args.url = url;
		args.dataType = "json";
		args.contentType = "application/json; charset=utf-8";

		if (args.data && type !== "GET") {
			args.data = JSON.stringify(args.data);
		}

		return $.ajax(args);
	}
});
