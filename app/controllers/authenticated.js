MY_APP.AuthenticatedController = Ember.Controller.extend({
	// Properties
	user: null,
	token: null,

	// Observers
	tokenChanged: function () {
		MY_APP.Model.setToken(this.get("token"));
	}.observes("token"),

	// Methods
	isValid: function () {
		return ((null != this.get("token")) && (null != this.get("user")));
	},
	setCookies: function (token) {
		if (null == token) {
			$.removeCookie("token");
			return;
		}

		$.cookie("token", token);
	},
	getCookies: function () {
		return $.cookie("token");
	},
	reset: function () {
		this.setCookies();

		this.setProperties({
			user: null,
			token: null
		});
	},
	setAuthenticated: function (token, user) {
		if ((null == token) || (null == user)) {
			this.reset();
			return;
		}

		this.setCookies(token);

		this.setProperties({
			user: user,
			token: token
		});
	},
	tryToAuthenticate: function () {
		var that = this;

		if (this.isValid()) {
			return MY_APP.Model.asResolvedPromise(this.get("user"));
		}

		var cookies = this.getCookies();

		if (null == cookies) {
			this.reset();
			return MY_APP.Model.asRejectedPromise();
		}

		this.set("token", cookies);

		// TODO: Get the authenticated from your server using the token
		//	return MY_APP.User.find().then(
		//		function (user) {
		//			that.set("user", user);
		//			return that.get("user");
		//		});
		that.set("user", MY_APP.Model.create({}));
		return MY_APP.Model.asResolvedPromise(that.get("user"));
	}
});
