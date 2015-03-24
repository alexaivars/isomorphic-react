/* jshint node:true, es3:false */

'use strict';

var createStore = require('fluxible/addons/createStore');
var debug = require('debug')('app:datastore:debug');
var Immutable = require('immutable');
var EMPTY_LIST = Immutable.List([]);
var EMPTY_MAP = Immutable.Map({});

// This is a very optimistic data store.
module.exports= createStore({
  storeName: 'DataStore',
	initialize: function() {
		this.data = Immutable.Map({});
	},
	
	// Map action constants to handler functions
	handlers: {
		SEARCH_TRACK: '_receiveSearch',
		LOAD_TRACK: '_receiveTrack'
	},
	_receiveSearch: function(data) {
		var updated = Immutable.fromJS(data);	
		if(!Immutable.is(this.data, updated)) {
			this.data = updated;
			this.emitChange();
		}
  },
	_receiveTrack: function(data) {
		var updated = Immutable.fromJS(data);
		if(!Immutable.is(this.data, updated)) {
			this.data = updated;
			this.emitChange();
		}
  },
  getTracks: function() {
		return this.data
						.getIn(['tracks','items'], EMPTY_LIST)
						.toJS();
  },
	
	getTrack: function(id) {
		if(this.data.get('id') !== id) {
			return null
		} else {
			return this.data.toJS();
		}
	},

	getQuery: function() {
		return this.data
						.getIn(['query'], EMPTY_MAP)
						.toJS();
	},
  getMessage: function() {
		return this.data
						.getIn(['message'], '');
  },
	
	// Fluxible isomorphic interface methods. 
	dehydrate: function() {
		debug('dehydrating immutable %s', this.constructor.storeName);
		return {
			data: this.data.toJS(),
		};
	},
	
	rehydrate: function(state) {
		debug('rehydrating imutable %s', this.constructor.storeName);
		this.data = Immutable.fromJS(state.data);
	}
});

