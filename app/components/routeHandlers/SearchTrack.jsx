'use strict';

var React   = require('react');
var Router = require('react-router');
var SpotifySearch = require('../SpotifySearch.jsx');
var SpotifyMessage = require('../SpotifyMessage.jsx');
var SpotifyListTracks = require('../SpotifyListTracks.jsx');
var LoadAction = require('../../actions/LoadSearch');
var FluxibleMixin	= require('fluxible').FluxibleMixin;

module.exports = React.createClass({
  displayName: 'ViewTrack',
  mixins: [FluxibleMixin],
  statics: {
    loadAction: LoadAction,
    storeListeners: ['DataStore']
  },
  /**
   * Event handler for 'change' events coming from the stores
   */
  onChange: function() {
    this.forceUpdate();
  },
	
	componentWillMount: function() {
		this.props.context.executeAction(LoadAction, {query:this.props.query});
	},
	
	render: function() {
    var store = this.props.context.getStore('DataStore');
    var message = store.getMessage();
    var tracks = store.getTracks();
    var query = store.getQuery();
    var meta = {
      query: query
    };
    return (
      <div className='spotify-search'>
        <SpotifySearch value={query.q} context={this.props.context} />
        <SpotifyMessage value={message} />
        <SpotifyListTracks model={tracks} meta={meta} />
      </div>
    );
  }
});
