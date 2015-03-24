'use strict';

var debug = require('debug')('app:action:loadapp');

module.exports = function(context, payload, done) {
  debug('executing load search %s', JSON.stringify(payload));
  context.service.read('search', {
    type:'track',
    q: payload.query.q
  }, null, function(data) {
		
		if (data.error && data.error.message) {
			data = {
				message: data.error.message,
        tracks: {}
      };
		}
    
		data.query = payload.query;
    context.dispatch('SEARCH_TRACK', data);
    done();
  });
};
