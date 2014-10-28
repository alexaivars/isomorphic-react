'use strict';

var React		= require('react'),
		Router = require('react-router'),
		Navigation = Router.Navigation,
		RouteHandler = Router.RouteHandler,
		StoreMixin = require('fluxible-app').StoreMixin,
		LoadSearch = require('app/actions/LoadSearch'),
		DataStore = require('app/stores/DataStore');

var SpotifySearch = React.createClass({
	displayName: 'SpotifySearch',
	mixins: [Navigation],
	propTypes: {
		value: React.PropTypes.string
	},
	handleChange: function(event) {

		var value = event.target.value;
		var context = this.props.context;
	
		context.executeAction(LoadSearch, { query: { q: value } });
		this.transitionTo('/', null, {q:value}); 
		this.setState({
			value: value
		});

	},
	getInitialState: function() {
		return {
			value: this.props.value
		}
	},
	render: function() {
		return (
			<form method='GET'>
				<div className='input-group'>
					<input 
						type='text'
						className='form-control'
						name='q'
						value={this.state.value}
						onChange={this.handleChange}
						autoComplete='off' />
					<span className='input-group-btn'>
						<button className='btn btn-default' type='submit'>Go!</button>
					</span>
				</div>
			</form>
		);
	}
});

var SpotifyTracks = React.createClass({
	render: function() {
		if(!this.props.model) {
			return false;
		}
		var model = this.props.model;
		return (
		<ul className='list-group'>
		{model.map(function (item) {
			return <li key={item.id} className='list-group-item'>
				<SpotifyTrack model={item}/>
			</li>;
		})}
		</ul>
		);
	}
});

var SpotifyAlbumCover = React.createClass({
	render: function() {	
		var url;
		try { 
			url = this.props.model.images[1].url
		} catch(e) {
			console.log('album missing covere image', this.props.model)
			return false;
		}
		return this.transferPropsTo(
			<figure>
				<img className='img-responsive img-rounded' src={url}/>
			</figure>
		);
	}
});

var SpotifyTrack = React.createClass({
	render: function() {
		if(!this.props.model) {
			return false;
		}
		
		var model = this.props.model;

		return (
			<article className='row'>
				<SpotifyAlbumCover className='col-xs-3' model={model.album} />
				<div className='col-xs-9'>
					<h2 className='h5'>{model.album.name}</h2>
					<h1 className='h4'>{model.name}</h1>
				</div>
			</article>
		);
	}
});
	
var Alert = React.createClass({
	render: function() {
		if(!this.props.value) {
			return false;
		}
		
		return (
			<div className='alert alert-info' role='alert'>{this.props.value}</div>
		);
	}
});

module.exports = React.createClass({
	displayName: 'AppHandler',			
	mixins: [Router.State, StoreMixin],
	statics: {
		loadAction: require('app/actions/LoadSearch'),
		storeListeners: ['DataStore']
	},
	getStateFromStores: function() {
		var store = this.props.context.getStore(DataStore);
		return {
			message: store.getMessage(),
			tracks: store.getTracks()
		}
	},
	getInitialState: function() {
		return this.getStateFromStores();
	},
	render: function() {
		var tracks = this.state.tracks;
		var message = this.state.message;
		var query = this.getQuery().q;
		return (
			<div className='container-fluid'>
				<div className='jumbotron'>
					<h1>Spotify search</h1>
				</div>
				<div className='spotify-search'>
					<SpotifySearch value={query} context={this.props.context}/>
					<Alert value={message}/>
					<SpotifyTracks model={tracks}/>
					<RouteHandler context={this.props.context}/>
				</div>
			</div>
		);
	},

	/**
	 * Event handler for 'change' events coming from the stores
	 */
	onChange: function() {
		this.setState(this.getStateFromStores());
	}

});

