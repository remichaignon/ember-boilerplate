/* global module:false */
/* global visit:false */
/* global find:false */

QUnit.config.autostart = false;

function exists (selector) {
	return !!find(selector).length;
}


module("Ember.js Library", {
	teardown: function () {
		MY_APP.reset();
	}
});

test("Check HTML is returned", function() {

	visit("/").then(
		function () {
			ok(exists("*"), "Found HTML!");
		}
	);

});