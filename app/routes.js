define(function(require, exports, module) {
	var Q = require('q'),
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
				callback(null, 'index', err);
			});
		});
	};
});
