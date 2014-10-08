define(function(require, exports, module) {

	var Q = require('q');

	module.exports = function(match) {
		match('/', function(callback) {
			console.log('index');

			setTimeout(function(){
				callback(null, 'index', {posts: 'posts'});
			}, 1000);
			
		});
	};

});
