define(function(require, exports, module) {

	'use strict';
	

	var Router = require('app/router');
	var routes = require('app/routes');
	var	router = new Router(routes);
	router.start();
	

});
