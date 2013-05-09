Ember.subscribe("render", {
	before: function (name, start) {
		return start;
	},
	after: function (name, end, payload, start) {
		var duration = Math.round(end - start);
		var template = payload.template;
		if (template && MY_APP.LOG_INSTRUMENTS) { // This is to filter out anonymous templates
			console.log("Instrument - Rendering", template, "took", duration, "ms");
		}
	}
});