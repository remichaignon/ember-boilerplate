MY_APP.Alert = Ember.Mixin.create({
	// Properties
	alertType: null,
	alertTitle: null,
	alertDescription: null,
	alertHidden: true,

	alertClass: function () {
		if (null == this.get("alertType")) {
			return "";
		}

		return "alert-" + this.get("alertType");
	}.property("alertType"),

	// Events
	dismissAlert: function () {
		this.clearAlert();
	},

	// Methods
	setAlert: function (type, title, description) {

		this.setProperties({
			alertType: type,
			alertTitle: title,
			alertDescription: description,
			alertHidden: false
		});
	},
	clearAlert: function () {
		this.setProperties({
			alertType: null,
			alertTitle: null,
			alertDescription: null,
			alertHidden: true
		});
	}.observes("firstName", "lastName", "email", "password")
});