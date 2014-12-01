
'use strict';

var React		= require('react'),
		Router = require('react-router'),
		RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
	displayName: 'AppHandler',			
	render: function() {
		return (
			<div className='container-fluid'>
				<div className='jumbotron'>
					<h1>Spotify React search</h1>
				</div>
				<RouteHandler context={this.props.context}/>
			</div>
		);
	}
});

