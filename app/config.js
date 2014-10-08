/*global requirejs, require, beta*/

if (typeof window.define !== "function") {
		try {
			window.define = beta.define;
		} catch(e) {
		
		}
}

requirejs.config({
	baseUrl: '/',
	paths: {
		'q': 'node_modules/q/q',
		'react': 'node_modules/react/dist/react',
		'lodash': 'node_modules/lodash/dist/lodash',
		'director': 'node_modules/director/build/director' 
	},
	deps: [
	],
	shim: {
		'director': {
			exports: 'Router'
		}
	},
	map: {
		'*': {
			underscore: 'lodash'
		}
	},
	packages: [
	]
});

//>>excludeStart("buildExclude", pragmas.buildExclude);
require(['app/entry']);
//>>excludeEnd("buildExclude");
