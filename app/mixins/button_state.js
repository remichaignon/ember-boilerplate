MY_APP.ButtonState = Ember.Mixin.create({
	busy: null,

	setButtonBusy: function() {
		this.set("busy", true);
	},
	unsetButtonBusy: function() {
		this.set("busy", false);
	}
});