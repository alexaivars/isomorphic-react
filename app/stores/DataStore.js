/* jshint node:true, es3:false */

'use strict';

var createStore = require('dispatchr/utils/createStore');
var PersistentStoreMixin = require('../mixins/PersistentStoreMixin');

// This is a very optimistic data store.
var DataStore = createStore({
	storeName: 'DataStore',
	mixins: [PersistentStoreMixin],
	initialize: function() {
		this.data = {};
	},
	handlers: {
		SEARCH_TRACK: function(data) {
			if(data.error && data.error.message) {
				this.data = {
					message: data.error.message,
					tracks: []
				};
			} else {
				this.data = data;
			}
			this.emitChange();
		},
		LOAD_TRACK: function(data) {
			if(data.error && data.error.message) {
				this.data = {
					message: data.error.message,
					tracks: []
				};
			} else {
				this.data = {
					tracks: {
						items: [data]
					}
				};
			}
			this.emitChange();
		}	
	},
	getTracks: function() {
		try {
			return this.data.tracks.items || [];
		} catch (e) {
			return [];
		}
	},
	getMessage: function() {
		try {
			return this.data.message;
		} catch (e) {
			return [];
		}
	}

});

module.exports = DataStore;

