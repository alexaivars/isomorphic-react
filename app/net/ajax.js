define(function(require, exports, module) {

  "use strict";

  require("amd-loader");

	var request = require('superagent');
	var Q = require('q');

  function wrapper(options) {
    var deferred = Q.defer();
		request
			.get(options.url)
			.query(options.data)
			.end(function(error, res){
				if(res.status === 200) {
					deferred.resolve(res.body);
				} else {
					deferred.reject(res.body);
				}
			})	
    return deferred.promise;
	}

  module.exports = wrapper;

});
