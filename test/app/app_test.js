module("Application", {
	setup: function () {
		Ember.run(function () {MY_APP.reset();});
	}
});

test("Parameters", function () {
	ok(MY_APP.rootElement === "#MY_APP", "rootElement");
	ok(Ember.$.support.cors, "Cross-origin resource sharing support");
});
