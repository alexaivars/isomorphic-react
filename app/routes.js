define(function(require, exports, module) {
	var Q = require('q'),
			isServer = typeof window === 'undefined',
			endpoint = 'https://api.spotify.com/v1/search/',
			ajax = require('app/net/ajax');

	module.exports = function(match) {
		match('/', function(callback, query) {
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
