module("Application", {
	setup: function () {
		MY_APP.reset();
	}
});

test("Parameters", function () {
	ok(Ember.$.support.cors, "Cross-origin resource sharing support");
});
