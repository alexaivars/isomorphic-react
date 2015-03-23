'use strict';

var React   = require('react');
var Router = require('react-router');
var StoreMixin = require('fluxible').StoreMixin;
var SpotifyTrack =  require('../SpotifyTrack.jsx');

module.exports = React.createClass({
  displayName: 'ViewTrack',
  mixins: [StoreMixin],
  statics: {
    loadAction: require('../../actions/LoadTrack'),
    storeListeners: ['DataStore']
  },
  render: function() {
    var store = this.props.context.getStore('DataStore');
    var tracks = store.getTracks();
    var track = tracks[0];
		var meta = {
			query: store.getQuery()
		};
		
    return (
      <div className='spotify-search'>
        <SpotifyTrack model={track} meta={meta}/>
      </div>
    );
  },
  onChange: function() {
    this.forceUpdate();
  }
});
