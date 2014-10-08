/**
 * Entry point for client-side.
 */

define(function(require, exports, module) {

	var Router = require('app/router')
  , routes = require('app/routes')
  , router = new Router(routes)
;

window.router = router;

router.start(window.bootstrappedData);

});
