define(function(require, exports, module) {

	'use strict';
	var React = require('react'),
			Route = require('react-router').Route;

	// rout handler components
	var App	= require('app/components/handlers/app.jsx');

	module.exports = (
			<Route name="index" path="/" handler={App}>
			</Route>
		);

});
