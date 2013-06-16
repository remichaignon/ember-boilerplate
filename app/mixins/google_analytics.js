// from: https://developers.google.com/analytics/devguides/collection/analyticsjs/

MY_APP.GoogleAnalytics = Ember.Mixin.create({
	// from: http://garthpoitras.com/blog/google-analytics-in-ember-applications
	trackPageView: function () {
		if (("undefined" !== typeof ga) && !Ember.isNone(ga)) {
			Ember.run.next(
				function () {
					var location = window.location;
					var page = location.hash ? location.hash.substring(1) : location.pathname + location.search;

					ga("set", "page", page);
					ga("send", "pageview");
				}
			);
		}
	}.observes("currentPath"),
	trackButtonClick: function (label) {
		if (("undefined" !== typeof ga) && !Ember.isNone(ga)) {
			Ember.run.next(
				function () {
					ga("send", "event", "button", "click", label);
				}
			);
		}
	}
});