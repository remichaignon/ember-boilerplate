MY_APP.ApplicationController = Ember.Controller.extend(MY_APP.GoogleAnalytics, {
	needs: [],

	language: null,

	targetRoute: null,
	targetModel: null,

	isSetup: false
});
