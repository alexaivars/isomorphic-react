define(function(require, exports, module) {
	
	"use strict";

	var director = require('director'),
			React = require('react'),
			Index = require('app/generated/core/layout'),
			isServer = typeof window === 'undefined',
			DirectorRouter = isServer ? director.http.Router : director,
			firstRender = true,
			appId = 'example_app';

	function Router(routesFn) {
		if (routesFn === null || routesFn === undefined) {
			throw new Error("Must provide routes.");
		}
		this.directorRouter = new DirectorRouter(this.parseRoutes(routesFn));
	}

	/**
	 * Capture routes as object that can be passed to Director.
	 */
	Router.prototype.parseRoutes = function(routesFn) {
		var routes = {};
		routesFn(function(pattern, handler) {
			console.log("pattern:", pattern);
			// Server routes are an object, not a function. We just use `get`.
			if (isServer) {
				routes[pattern] = {
					get: this.getRouteHandler(handler)
				};
			} else {
				routes[pattern] = this.getRouteHandler(handler);
			}
		}.bind(this));
		return routes;
	};

	Router.prototype.getRouteHandler = function(handler) {
		var router = this;
		return function() {
			/** If it's the first render on the client, just return; we don't want to
			 * replace the page's HTML.
			 */
			if (!isServer && firstRender) {
				console.log('firstrender');
				firstRender = false;
				return;
			}

			// `routeContext` has `req` and `res` when on the server (from Director).
			var routeContext = this,
					params = Array.prototype.slice.call(arguments),
					handleErr = router.handleErr.bind(routeContext);

			function handleRoute() {
				handler.apply(null, params.concat(function routeHandler(err, viewPath, data) {
					if (err) {
						return handleErr(err);
					}
					data = data || {};
					if (isServer) {
						router.handleServerRoute(viewPath, data, routeContext.req, routeContext.res);
					} else {
						router.handleClientRoute(viewPath, data);
					}
				}));
			}

			try {
				handleRoute();
			} catch (err) {
				handleErr(err);
			}
		};
	};

	Router.prototype.handleErr = function(err) {
		console.error(err.message + err.stack);
		// `this.next` is defined on the server.
		if (this.next) {
			this.next(err);
		} else {
			console.error(err.message);
		}
	};


	Router.prototype.handleClientRoute = function(viewPath, model) {
		console.log('handleClientRoute');
		React.renderComponent(Index({model:model}), document.getElementById(appId));
	};

	Router.prototype.handleServerRoute = function(viewPath, model, req, res) {
		console.log('handleServerRoute');
		try {
		res.render('layout',{
			id: appId,
			body: React.renderComponentToString(Index({model:model})),
			bodyModel: JSON.stringify(model, undefined, 4)
		});
		} catch (e) {
			console.log(e);
		}
	};

	/*
	 * Express middleware function, for mounting routes onto an Express app.
	 */
	Router.prototype.middleware = function() {
		var directorRouter = this.directorRouter;

		return function middleware(req, res, next) {
			// Attach `this.next` to route handler, for better handling of errors.
			directorRouter.attach(function() {
				this.next = next;
			});

			// Dispatch the request to the Director router.
			directorRouter.dispatch(req, res, function (err) {
				// When a 404, just forward on to next Express middleware.
				if (err && err.status === 404) {
					next();
				}
			});
		};
	};

	/**
	 * Client-side handler to start router.
	 */
	Router.prototype.start = function(bootstrappedData) {
		console.log('start');
		this.bootstrappedData = window[appId + 'BootstrappedData'];
		this.handleClientRoute(null, this.bootstrappedData);
		/**
		 * Tell Director to use HTML5 History API (pushState).
		 */
		this.directorRouter.configure({
			html5history: true
		});

		/**
		 * Intercept any links that don't have 'data-pass-thru' and route using
		 * pushState.
		 */
		document.addEventListener('click', function(e) {
			var el = e.target,
					dataset = el && el.dataset;

			if (el && el.nodeName === 'A' && (
					dataset.passThru === null || dataset.passThru === 'false'
				)) {
				this.directorRouter.setRoute(el.attributes.href.value);
				e.preventDefault();
			}
		}.bind(this), false);

		/**
		 * Kick off routing.
		 */
		this.directorRouter.init();
	};

	/**
	 * Client-side method for redirecting.
	 */
	Router.prototype.setRoute = function(route) {
		this.directorRouter.setRoute(route);
	};
	
	module.exports = Router;

});

