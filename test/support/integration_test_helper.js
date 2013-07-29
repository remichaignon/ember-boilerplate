Ember.testing = true;

MY_APP.setupForTesting();
MY_APP.injectTestHelpers();

function exists (selector) {
    return !!find(selector).length;
}

function missing (selector) {
    var error = "element " + selector + " found (should be missing)";
    throws(function() { find(selector); }, error);
}
