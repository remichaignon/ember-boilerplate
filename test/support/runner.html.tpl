<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<title>MY_APP QUnit Tests</title>

	<link rel="stylesheet" type="text/css" href="support/qunit.css">
	<link rel="stylesheet" type="text/css" href="../MY_APP.css">
	<style>
		#MY_APP-testing-container { position: absolute; background: white; bottom: 0; right: 0; width: 640px; height: 384px; overflow: auto; z-index: 9999; border: 1px solid #ccc; }
		#MY_APP-testing { zoom: 50%; }
	</style>

	<script type="text/javascript">
		TESTING = true;
	</script>
	<script type="text/javascript" src="support/qunit.js"></script>
	<script src="../MY_APP.js"></script>
</head>
<body>
	<div id="qunit"><div id="qunit-fixture"></div></div>
	<div id="MY_APP-testing-container"><div id="MY_APP-testing"></div></div>

	<% _.each(files, function(filepath) { %><script type="text/javascript" src="<%= filepath %>"></script><% }); %>
</body>
</html>