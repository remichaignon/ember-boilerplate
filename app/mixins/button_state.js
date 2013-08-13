MY_APP.ButtonState = Ember.Mixin.create({
	// Properties
	busy: null,

	// Methods
	setButtonBusy: function() {
		this.set("busy", true);
	},
	unsetButtonBusy: function() {
		this.set("busy", false);
	}
});