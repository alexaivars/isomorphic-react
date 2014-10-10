define(function(require, exports, module) {

	var Q = require('q');

	module.exports = function(match) {
		match('/', function(callback) {
			setTimeout(function(){
				callback(null, 'index', {posts: 'posts'});
			}, 1000);
		});
	};

});
