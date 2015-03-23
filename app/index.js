'use strict';

var FluxibleApp = require('fluxible');
var app = new FluxibleApp({
  component: require('./routes.jsx')
});

app.uid = '__example';

app.registerStore(require('./stores/DataStore'));

app.plug(require('./plugins/EnvPlugin'));
app.plug(require('./plugins/ServicePlugin'));

module.exports = app;
