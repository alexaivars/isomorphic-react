/* jshint node:true, es3:false */

"use strict";

require('node-jsx').install({ extension: '.jsx' });
require('amd-loader');

var express = require('express'),
		expressState = require('express-state'),
		expressHandlebars = require('express-handlebars'),
		path = require('path'),
		compression	= require('compression'),
		bodyParser = require('body-parser'),
		debug = require('debug')('server:'),
		React = require('react'),
		Router = require('react-router'),
		async = require('async'),
		server = express(),
		app = require('app'),
		hbs = expressHandlebars.create({extname: '.hbs'}),
		root = path.resolve(__dirname, '../'),
		port = process.env.PORT || 5000;


// Running in production you should precompile your bundle.
var logger = require('morgan'),
		webpack = require('webpack'),
		webpackConfig = require('../webpack.config.js'),
		webpackCompiler = webpack(webpackConfig),
		webpackMiddlewareFactory = require("webpack-dev-middleware"),
		webpackMiddleware = webpackMiddlewareFactory(webpackCompiler, {
			// noInfo: true,
			publicPath: webpackConfig.output.path,
			stats: {colors: true}
		});

server.use(webpackMiddleware);
server.use(logger('dev'));

// Register handlebars .engine with the Express server.
server.engine('hbs', hbs.engine);
server.set('views', path.join(root, 'server/views'));
server.set('view engine', 'hbs');
server.set('state namespace', app.uid);

server.use(bodyParser.json()); // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
server.use(compression({ filter: function(args) { return true; } })); // compress all requests and types

server.use('/app', express.static(path.join(root,'app')));
server.use('/node_modules', express.static(path.join(root,'node_modules')));
server.use('/resources', express.static(path.join(root,'resources')));

expressState.extend(server);

server.use(function (req, res, next) {
	var context = app.createContext({
		api: process.env.API || 'https://api.spotify.com/v1',
		env: {
			NODE_ENV: process.env.NODE_ENV
		}
	});
	
	debug('Loading application data');

	Router.run(app.getAppComponent(), req.url, function (Handler, state) {
	
		if(state.routes.length === 0) { res.status(404); }
		
		async.filterSeries(
			state.routes.filter(function(route) {
				return route.handler.loadAction?true:false;
			}),
			function(route, done) {
				context.getActionContext().executeAction(route.handler.loadAction, {params:state.params, query:state.query}, done);
			},
			function() {
				debug('Rendering application components');
				var markup = React.renderToString(React.createElement(Handler, {context: context.getComponentContext()}));
				res.expose(app.dehydrate(context), app.uid);
				res.render('layout', {
					uid: app.uid,
					html: markup
				}, function (err, markup) {
					if (err) {
						next(err);
					}
					res.send(markup);
				});
			}
		);
	});
});

server.listen(port, function() {
	console.log("Running in %s and listening on %s", root, port);
});

module.exports = server;
