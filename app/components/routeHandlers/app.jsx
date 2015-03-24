'use strict';

var React   = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    FluxibleComponent = require('fluxible').FluxibleComponent,
    FluxibleMixin = require('fluxible').FluxibleMixin,
    RouterPropTypes = require('react-router/lib/PropTypes');

module.exports = React.createClass({
  mixins: [FluxibleMixin],
  displayName: 'AppHandler',
  contextTypes: {
    router: RouterPropTypes.router.isRequired
  },
  statics: {
    storeListeners: ['DataStore']
  },
  onChange: function () {
	  var query = this.getStore('DataStore').getQuery();
    this.context.router.replaceWith(this.props.pathname, null, query);
  },
  render: function() {
		return (
      <div className='container-fluid'>
        <div className='jumbotron'>
          <h1>Spotify React search</h1>
        </div>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});
