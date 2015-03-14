'use strict';

var debug = require('debug')('app:action:loadtrack');

module.exports = function(context, payload, done) {
  debug('executing load track %s', JSON.stringify(payload));
  context.service.read('tracks/' + payload.params.id, null, null, function(data) {
    context.dispatch('LOAD_TRACK', data);
    done();
  });
};