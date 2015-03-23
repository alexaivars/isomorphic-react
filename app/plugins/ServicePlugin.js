'use strict';

var request = require('superagent');

module.exports = {
  name: 'ServicePlugin',
  plugContext: function(options) {
    var api = options.api;
    return {
      plugActionContext: function(actionContext) {
        actionContext.service = {
          read: function(resource, params, config, done) {
            var endpoint = api + '/' + resource;
            request
              .get(endpoint)
              .query(params)
              .type('json')
              .end(function(err, res){
								if (err) {
                  done(JSON.parse(res.text));
                } else {
                  done(JSON.parse(res.text));
                }
              });
          }
        };
      },
      dehydrate: function() {
        return { api: api };
      },
      rehydrate: function(state) {
        api = state.api;
      }
    };
  }
};
