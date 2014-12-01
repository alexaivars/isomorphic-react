'use strict';

var React		= require('react');
var Router = require('react-router');
var StoreMixin = require('fluxible-app').StoreMixin;
var DataStore = require('../../stores/DataStore');
var SpotifyTrack =  require('../SpotifyTrack.jsx');

module.exports = React.createClass({
	displayName: 'ViewTrack',			
	mixins: [Router.State, StoreMixin],
	statics: {
		loadAction: require('../../actions/LoadTrack'),
		storeListeners: ['DataStore']
	},
	getStateFromStores: function() {
		var store = this.props.context.getStore(DataStore);
		return {
			tracks: store.getTracks()
		};
	},
	getInitialState: function() {
		return this.getStateFromStores();
	},
	render: function() {
		
		var track = this.state.tracks[0];
		if(!track) { return false; }

		return (
			<div className='spotify-search'>
			<SpotifyTrack model={track}/>
			</div>
		);
	},
	onChange: function() {
		this.setState(this.getStateFromStores());
	}

});


