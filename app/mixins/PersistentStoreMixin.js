/* jshint node:true, es3:false */

'use strict';

var debug = require('debug')('app:mixin:persistentstoremixin');
var warn = require('debug')('app:mixin:persistentstoremixin:warn');

module.exports = {	
	dehydrate: function() {
		debug('dehydrating %s', this.constructor.storeName);
		if(!this.data) {
			warn('missing data object');
			return;
		}
		return Object.keys(this.data).reduce(function(result, prop) {
			result[prop] = this.data[prop];
			return result;
		}.bind(this), {});
	},

	rehydrate: function (state) {
		debug('rehydrating %s', this.constructor.storeName);
		Object.keys(state).forEach(function (prop) {
			this.data[prop] = state[prop];
		}.bind(this));
	}
};
