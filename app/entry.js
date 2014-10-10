define(function(require, exports, module) {

	'use strict';
	
	var Router = require('app/router'),
			routes = require('app/routes'),
			router = new Router(routes);
	
	router.start();

});
