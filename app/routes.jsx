'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

// rout handler components
var App	= require('./components/routeHandlers/app.jsx');
var ViewTrack = require('./components/routeHandlers/ViewTrack.jsx');
var SearchTrack = require('./components/routeHandlers/SearchTrack.jsx');

module.exports = (
	<Route path="" handler={App}>
		<DefaultRoute handler={SearchTrack}/>
		<Route path="track/:id" name="track" handler={ViewTrack}/>
	</Route>
);
