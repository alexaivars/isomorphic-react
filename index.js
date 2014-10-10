/* jshint node:true, es3:false */

"use strict";

require('amd-loader');

var express = require('express'),
		exphbs = require('express-handlebars'),
		compression	= require('compression'),
		logger = require('morgan'),
		path =  require('path'),
		routes = require('app/routes'),
		Router = require('app/router'),
		app = express(),
		hbs = exphbs.create({extname: '.hbs'}),
		port = process.env.PORT || 5050,
		router = new Router(routes),
		root = path.join(__dirname);

// compress all requests
app.use(compression());

// use logger
app.use(logger('dev'));

// Register handlebars .engine with the Express app.
app.engine('hbs', hbs.engine);
app.set('views', path.join(root, 'app/views'));
app.set('view engine', 'hbs');

app.use('/app', express.static(path.join(root,'app')));
app.use('/node_modules', express.static(path.join(root,'node_modules')));

// Mount the routes defined in `app/routes` on our server.
app.use(router.middleware());
app.listen(port, function() {
	  console.log("Listening on %s", port);
});

module.exports = app;

