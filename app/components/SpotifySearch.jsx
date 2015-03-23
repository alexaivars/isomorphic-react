'use strict';

var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var LoadSearch = require('../actions/LoadSearch');
var _ = require('lodash');
var Fluxible = require('fluxible');

module.exports = React.createClass({
  displayName: 'SpotifySearch',
  mixins: [Navigation],
  contextTypes: {
    executeAction: React.PropTypes.func.isRequired
  },
  propTypes: {
    value: React.PropTypes.string
  },
	
  componentDidMount: function () {
		// Proxy our onChangeHandler to throttle the output.
    this.onChangeHandlerThrottled = _.throttle(function(event) {
      this.context.executeAction(
        LoadSearch,
        {
          query: {
            q: event.target.value
          }
        }
      ); 
    }.bind(this), 250);
	},

	componentWillUnmount: function() {
		if(this.onChangeHandlerThrottled.cancel) {
			this.onChangeHandlerThrottled.cancel();
		}		
	},
	
	onChangeHandler: function (event) {
		// Because react synthetic events are pooled we 
		// need clone the properties we want to hang 
		// around after each event loop. We might try
		// using event.persist() in the future.
		var clone = { target: { value: event.target.value } };
		this.onChangeHandlerThrottled(clone);
	},

  render: function() {
		var changeHandler = this.onChangeHandler;
    return (
      <form method='GET'>
        <div className='input-group'>
          <input
               type='text'
               className='form-control'
               name='q'
               defaultValue={this.props.value || ''}
               onChange={changeHandler}
               autoComplete='off' />
          <span className='input-group-btn'>
            <button className='btn btn-default' type='submit'>Go!</button>
          </span>
        </div>
      </form>
    );
  }
});
