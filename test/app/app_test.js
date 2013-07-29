module("Application", {
	setup: function () {
		MY_APP.reset();
	}
});

test("Parameters", function () {
	ok(Ember.$.support.cors, "Cross-origin resource sharing support");
});

test("Template", function () {
	visit("/").then(
		function () {
			ok(exists("#app-wrapper"), "Found wrapper");
		}
	);
});