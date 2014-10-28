define(function(require, exports, module) {

	'use strict';
	
	var error = require('debug')('app:application:error');
	var FluxibleApp = require('fluxible-app');
	var app = new FluxibleApp({
		appComponent: require('app/components/routes.jsx')
	});


	
	app.uid = '__example';

	app.registerStore(require('app/stores/DataStore'));


	app.plug({
		name: 'EnvPlugin',
		plugContext: function (options) {
			var env = options.env || {};
			
			var get = function (name) {
				return env[name];
			};

			var isDevelopment = function() {
				return env.NODE_ENV === 'development';
			};

			return {
				plugComponentContext: function (componentContext) {
					componentContext.getEnv = get;
					componentContext.isDevelopment = isDevelopment;
				},
				plugActionContext: function (actionContext) {
					actionContext.getEnv = get;
					actionContext.isDevelopment = isDevelopment;
				},
				plugStoreContext: function (storeContext) {
					storeContext.getEnv = get;
					storeContext.isDevelopment = isDevelopment;
				},
				dehydrate: function () {
					return {
						env: env	
					};
				},
				rehydrate: function (state) {
					env = state.env;
				}
			};
		}
	});

	var request = require('superagent');
	app.plug({
		name: 'ServicePlugin',
		plugContext: function (options) {
			var api = options.api;
			return {
				plugActionContext: function (actionContext) {
					actionContext.service = {
						read: function(resource, params, config, done) {
							var endpoint = api + '/' + resource;
							request
								.get(endpoint)
								.query(params)
								.type('json')
								.end(function(err, res){
									if(err) {
										done(JSON.parse(err));
									} else {
										done(JSON.parse(res.text));
									}
								});
						}
					};
				},
				dehydrate: function () {
					return { api: api };
				},
				rehydrate: function (state) {
					api = state.api;
				}
			};
		}
	});
	
	module.exports = app;

});

