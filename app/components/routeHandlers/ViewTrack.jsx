'use strict';

var React   = require('react');
var Router = require('react-router');
var StoreMixin = require('fluxible-app').StoreMixin;
var SpotifyTrack =  require('../SpotifyTrack.jsx');

module.exports = React.createClass({
  displayName: 'ViewTrack',
  mixins: [Router.State, StoreMixin],
  statics: {
    loadAction: require('../../actions/LoadTrack'),
    storeListeners: ['DataStore']
  },
  getStateFromStores: function() {
    var store = this.props.context.getStore('DataStore');
    return {
      tracks: store.getTracks()
    };
  },
  getInitialState: function() {
    return this.getStateFromStores();
  },
  render: function() {
    if (!this.state.tracks || !this.state.tracks.length) {
      return false;
    }

    var track = this.state.tracks[0];

    return (
      <div className='spotify-search'>
        <SpotifyTrack model={track} />
      </div>
    );
  },
  onChange: function() {
    this.setState(this.getStateFromStores());
  }
});