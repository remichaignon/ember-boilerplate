/* global module:false */
/* global visit:false */

module("Ember.js Library", {
	setup: function () {
		Ember.run(MY_APP, MY_APP.advanceReadiness);
	},
	teardown: function () {
		MY_APP.reset();
	}
});

test("Check HTML is returned", function() {

	visit("/").then(
		function () {
			console.log("visited");
			ok(true, "Visited");
		},
		function () {
			console.log("fail");
		}
	);

});