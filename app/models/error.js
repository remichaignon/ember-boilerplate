MY_APP.Error = Ember.Object.extend({
	xhr: null,

	init: function () {
		if (MY_APP.LOG_ALL_ERRORS) {
			console.log("Error created - " + this.get("xhr"));
		}
	}
});
