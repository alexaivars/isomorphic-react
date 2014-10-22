/*global requirejs, require, beta*/


if (typeof window.define !== "function") {
		try {
			window.define = beta.define;
		} catch(e) {
		
		}
}

define('window-react', ['react'], function(react) {
	'use strict';
	console.warn('window-react', 'nead to fix react-router that breakes on the client');
	window.React = react;
});

requirejs.config({
	baseUrl: '/',
	suppress: { nodeShim: true },
	paths: {
		'jquery': 'node_modules/jquery/dist/jquery',
		'modernizr': 'app/libs/window.modernizr',
		'lodash': 'node_modules/lodash/dist/lodash',
		'reqwest': 'node_modules/reqwest/reqwest',
		'es5-shim': 'node_modules/es5-shim/es5-shim',
		'es5-sham': 'node_modules/es5-shim/es5-sham',
		'q': 'node_modules/q/q',
		'react': 'node_modules/react/dist/react',
		'react-router': 'node_modules/react-router/dist/react-router',
		'director': 'node_modules/director/build/director',
		'superagent': 'node_modules/superagent/superagent',
		'ignore': 'app/utils/ignore'
	},
	deps: [
		'es5-shim',
		'es5-sham',
		'window-react'
	],
	shim: {
		'director': {
			exports: 'Router'
		}
	},
	map: {
		'*': {
			'underscore': 'lodash',
			'node-cache': 'ignore',
			'amd-loader': 'ignore',
			'request': 'ignore'
		}
	},
	packages: [
	]
});

//>>excludeStart("buildExclude", pragmas.buildExclude);
require(['app/entry']);
//>>excludeEnd("buildExclude");
