'use strict';

module.exports = {
  name: 'EnvPlugin',
  plugContext: function(options) {
    var env = options.env || {};

    var get = function(name) {
      return env[name];
    };

    var isDevelopment = function() {
      return env.NODE_ENV === 'development';
    };

    return {
      plugComponentContext: function(componentContext) {
        componentContext.getEnv = get;
        componentContext.isDevelopment = isDevelopment;
      },
      plugActionContext: function(actionContext) {
        actionContext.getEnv = get;
        actionContext.isDevelopment = isDevelopment;
      },
      plugStoreContext: function(storeContext) {
        storeContext.getEnv = get;
        storeContext.isDevelopment = isDevelopment;
      },
      dehydrate: function() {
        return {
          env: env
        };
      },
      rehydrate: function(state) {
        env = state.env;
      }
    };
  }
};