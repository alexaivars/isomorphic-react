/** @jsx React.DOM */

define(function(require, exports, module) {

	"use strict";

	var React = require('react');
	var Q = require('q');
	var Router = require('react-router');
	var Route = Router.Route;
	var Routes = Router.Routes;
	var NotFoundRoute = Router.NotFoundRoute;
	var DefaultRoute = Router.DefaultRoute;
	var Link = Router.Link;
	var isServer = typeof window === 'undefined';

	function delay(ms) {
		var deferred = Q.defer();
		setTimeout(deferred.resolve, ms);
		return deferred.promise;
	}
	var a = 'empty'
	var App = React.createClass({
		statics: {
			willTransitionTo: function (transition, params, query) {
				
				console.log('willTransitionTo ====> ', transition, params, query, this);
					transition.wait(delay(1000).then(function(){
						a = 'data'
					}));
			},
			getAsyncProps: function (params, query) {
				console.log('getAsyncProps');
			}
		},
		componentWillMount: function() {
			console.log(a);
			console.log('componentWillMount', arguments);
		},
		componentDidMount: function() {
			console.log('componentDidMount', arguments);
		},
		componentWillUnmount: function () {
			console.log('componentWillUnmount', arguments);
		},
		componentWillReceiveProps: function() {
			console.log('componentWillReceiveProps', arguments);
		},
		render: function() {
			return (
				<div>
					{this.state}
					<header>
						<ul>
							<li><Link to="app">Dashboard</Link></li>
							<li><Link to="inbox">Inbox</Link></li>
							<li><Link to="calendar">Calendar</Link></li>
						</ul>
						Logged in as Joe
					</header>

					{/* this is the important part */}
					<this.props.activeRouteHandler/>
				</div>
			);
		}
	});

	var Inbox = React.createClass({
		render: function() {
			return (
				<div>inbox component.</div>
			);
		}
	});

	var Calendar = React.createClass({
		componentWillMount: function() {
			console.log('componentWillMount');
		},
		componentDidMount: function() {
			console.log('componentDidMount');
		},
		componentWillUnmount: function () {
			console.log('componentWillUnmount');
		},
		componentWillReceiveProps: function() {
			console.log('componentWillReceiveProps');
		},
		
		render: function() {
			return (
				<div>calendar component.</div>
			);
		}
	});
	
	var Dashboard = React.createClass({
		render: function() {
			return (
				<div>dashboard component.</div>
			);
		}
	});
	
	var routes = (
		<Routes location="history">
			<Route name="app" path="/" handler={App}>
				<Route name="inbox" handler={Inbox}/>
				<Route name="calendar" handler={Calendar}/>
				<DefaultRoute handler={Dashboard}/>
			</Route>
		</Routes>
	);


	module.exports = routes;

});
