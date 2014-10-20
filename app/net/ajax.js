define(function(require, exports, module) {

  "use strict";

  require("amd-loader");

  var Q = require('q');
  var request = require('request');
  var $	= require('jquery');
  var isServer = typeof window === 'undefined';

  function wrapper(options) {
    var deferred = Q.defer();
    request.get({
      url: options.url,
			qs: options.data,
      json:true
    }, function (err, httpResponse, body) {
      // TODO should reject the request if 404, 500 and so on. See jQuery.ajax
			if (err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(body);
      }
    });

    return deferred.promise;
  }

  module.exports = (isServer) ? wrapper : $.ajax;

});
