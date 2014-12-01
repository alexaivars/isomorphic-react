'use strict';

var React		= require('react');
var Router = require('react-router');
var StoreMixin = require('fluxible-app').StoreMixin;
var DataStore = require('../../stores/DataStore');
var SpotifySearch = require('../SpotifySearch.jsx');
var SpotifyMessage = require('../SpotifyMessage.jsx');
var SpotifyListTracks = require('../SpotifyListTracks.jsx');


module.exports = React.createClass({
	displayName: 'ViewTrack',			
	mixins: [Router.State, StoreMixin],
	statics: {
		loadAction: require('../../actions/LoadSearch'),
		storeListeners: ['DataStore']
	},
	getStateFromStores: function() {
		var store = this.props.context.getStore(DataStore);
		return {
			message: store.getMessage(),
			tracks: store.getTracks()
		};
	},
	getInitialState: function() {
		return this.getStateFromStores();
	},
	render: function() {
		var tracks = this.state.tracks;
		var message = this.state.message;
		var query = this.getQuery().q;
		var meta = {
			query: query
		};
		return (
			<div className='spotify-search'>
			<SpotifySearch value={query} context={this.props.context}/>
			<SpotifyMessage value={message}/>
			<SpotifyListTracks model={tracks} meta={meta}/>
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


