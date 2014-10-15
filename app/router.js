define(function(require, exports, module) {
	
	"use strict";

	var	React = require('react'),
			ReactRouter = require('react-router'),
			routes = require('app/generated/router'),
			isServer = typeof window === 'undefined',
			firstRender = true,
			_ = require('lodash'),
			appId = 'example_app';

	function Router(routesFn) {
		return this;
	}

	Router.prototype.middleware = function() {

		return function middleware(req, res, next) {
			var markup = ReactRouter.renderRoutesToString(
				routes,
				req.url,
				function(error, abortReason, markup) {
					console.log('done', markup);
					res.render('layout', {
						id: appId,	
						body: markup
					});	
				}
			);
			
			// next();
		};
	};

	Router.prototype.start = function() {
		React.renderComponent(routes, document.getElementById(appId));
	};

	module.exports = Router;

});

