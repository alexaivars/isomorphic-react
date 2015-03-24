'use strict';

var React   = require('react');
var Router = require('react-router');
var FluxibleMixin	= require('fluxible').FluxibleMixin;
var SpotifyTrack =  require('../SpotifyTrack.jsx');
var LoadAction = require('../../actions/LoadTrack');

module.exports = React.createClass({
  displayName: 'ViewTrack',
  mixins: [FluxibleMixin],
  statics: {
    loadAction: LoadAction,
    storeListeners: ['DataStore']
  },
	componentWillMount: function() {
		this.props.context.executeAction(LoadAction, {params:this.props.params, query: this.props.query});
	},
	
  render: function() {
    var store = this.props.context.getStore('DataStore');

    var track = store.getTrack(this.props.params.id);
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
