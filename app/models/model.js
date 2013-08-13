MY_APP.Model = Ember.Object.extend({});

MY_APP.Model.reopenClass({
	token: null,
	setToken: function (token) {
		this.token = token;
	},
	getToken: function () {
		return this.token;
	},

	ajaxAPI: function (type, url, args) {
		var token = MY_APP.Model.getToken();

		return new Ember.RSVP.Promise(
			function(resolve, reject) {
				args.type = type;
				args.url = MY_APP.CONFIG.API_URL + url;
				args.dataType = "json";
				args.contentType = "application/json; charset=utf-8";

				if (args.data && type !== "GET") {
					args.data = JSON.stringify(args.data);
				}

				args.beforeSend = function (xhr) {
					xhr.setRequestHeader("key", MY_APP.CONFIG.API_KEY);

					if (null != token) {
						xhr.setRequestHeader("token", token);
					}
				};

				args.success = function(xhr) {
					xhr.then = null;
					Ember.run(null, resolve, xhr);
				};

				args.error = function(xhr) {
					xhr.then = null;
					Ember.run(null, reject, xhr);
				};

				Ember.$.ajax(args);
			}
		);
	},

	ajaxSite: function (type, url, args) {
		return new Ember.RSVP.Promise(
			function(resolve, reject) {
				args.type = type;
				args.url = url;
				args.dataType = "json";
				args.contentType = "application/json; charset=utf-8";

				if (args.data && type !== "GET") {
					args.data = JSON.stringify(args.data);
				}

				args.success = function(xhr) {
					xhr.then = null;
					Ember.run(null, resolve, xhr);
				};

				args.error = function(xhr) {
					xhr.then = null;
					Ember.run(null, reject, xhr);
				};

				Ember.$.ajax(args);
			}
		);
	},

	asResolvedPromise: function (objectToWrap) {
		return new Ember.RSVP.Promise(
			function(resolve) {
				resolve(objectToWrap);
			}
		);
	},
	asRejectedPromise: function (objectToWrap) {
		return new Ember.RSVP.Promise(
			function(resolve, reject) {
				reject(objectToWrap);
			}
		);
	}
});
