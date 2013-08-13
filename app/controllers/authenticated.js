MY_APP.AuthenticatedController = Ember.Controller.extend({
	// Properties
	user: null,
	token: null,

	// Observers
	tokenChanged: function () {
		MY_APP.Model.setToken(this.get("token"));
	}.observes("token"),

    // Hooks
    init: function () {
        if (null != MY_APP.AUTH) {
            this.set("user", MY_APP.AUTH);
            this.set("token", MY_APP.Model.getToken());
            MY_APP.AUTH = null;
        }
    },

	// Methods
	isValid: function () {
		return ((null != this.get("token")) && (null != this.get("user")));
	},
	setCookies: function (token) {
		if (null == token) {
			Ember.$.removeCookie("token");
			return;
		}

		Ember.$.cookie("token", token);
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
	}
});

MY_APP.AuthenticatedController.reopenClass({
	getCurrent: function () {
		var token = Ember.$.cookie("token");

		if (null == token) {
			Ember.$.removeCookie("token");

			return MY_APP.Model.asRejectedPromise({ code: 418, message: "No cookies." });
		}

		MY_APP.Model.setToken(token);

		// TODO: Get the authenticated from your server using the token
		//	return MY_APP.User.find().then(
		//		function (user) {
		//			return user;
		//		},
		//		function () {
		//			Ember.$.removeCookie("token");
		//			MY_APP.Model.setToken(null);
		//		}
		//	);
		return MY_APP.Model.asResolvedPromise(MY_APP.Model.create({}));
	}
});
