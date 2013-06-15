module("Ember.js Library", {
	setup: function () {
		Ember.run(MY_APP, MY_APP.advanceReadiness);
	},
	teardown: function () {
		MY_APP.reset();
	}
});

test("Check HTML is returned", function() {

	visit("/insights").then(function () {
		ok(exists("*"), "Found HTML!");
	});

});