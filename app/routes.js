define(function(require, exports, module) {

	var Q = require('q'),
			$ = require('jquery'),
			isServer = typeof window === 'undefined',
			endpoint = 'https://api.spotify.com/v1/search/',
			ajax;

	function RequestAjaxWrapper(options) {
		var deferred = Q.defer();
		var request = require('request');
		request.get({
			url: options.url,
			json:true,
			qs: options.data
		}, function (err, httpResponse, body) {
			if (err) {
				deferred.reject(new Error(err));
			} else {
				deferred.resolve(body);
			}
		});
		return deferred.promise;
	}

	if(isServer) {
		ajax = RequestAjaxWrapper;
	} else {
		ajax = require('reqwest');
	}

	module.exports = function(match) {
		match('/', function(callback, query) {
			console.log(query);
			ajax({
        url: endpoint,
				method: 'get',
				crossOrigin: true,
				data: {
					type: 'track',
					q: query.q
				}
			})
			.then(function(response) {
				callback(null, 'index', response);
			})
			.fail(function(err) {
				var ret;
				try {
					ret = err.response?JSON.parse(err.response):{};
				} catch(e) {
					ret = {}
				}
				callback(null, 'index', ret);
			
			});
		});
	};

});
