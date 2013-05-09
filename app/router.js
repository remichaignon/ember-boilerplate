require("app/routes/route");

require("app/routes/do_setup");

require("app/routes/application");
require("app/routes/index");
require("app/routes/404");


MY_APP.Router.map(function () {
	this.route("doSetup");

	this.route("fourOhFour", { path: "*unknown_path"});
});
