'use strict';

var FluxibleApp = require('fluxible-app');
var app = new FluxibleApp({
  appComponent: require('./routes.jsx')
});

app.uid = '__example';

app.registerStore(require('./stores/DataStore'));

app.plug(require('./plugins/EnvPlugin'));
app.plug(require('./plugins/ServicePlugin'));

module.exports = app;