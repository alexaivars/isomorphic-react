/* jshint node:false */
(function() {
		
	'use strict';
	
	var debug = require('debug')('app:client:debug');
	var error = require('debug')('app:client:error');
	
	try {
		var React = require('react');
		var Router = require('react-router');
		var app = require('./app');
		var dehydratedState = window[app.uid];

		// Debug.enable('*');
		debug('rehydrating app');
		app.rehydrate(dehydratedState, function (err, context) {
				if (err) {
					error(err);
					return;
				}
				debug('React Rendering');
				Router.run(app.getAppComponent(), Router.HistoryLocation, function (Handler, state) {
					React.render(
						React.createElement(
							Handler,
							{context: context.getComponentContext()}
						),
						document.getElementById(app.uid)
					);
					debug('React Rendered');
				});

		});
	} catch (err) {
		error(err);
	}

}).call(this);

