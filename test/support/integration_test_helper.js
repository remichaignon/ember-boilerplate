Ember.testing = true;

SE.setupForTesting();
SE.injectTestHelpers();

function exists (selector) {
    return !!find(selector).length;
}

function missing (selector) {
    var error = "element " + selector + " found (should be missing)";
    throws(function() { find(selector); }, error);
}
