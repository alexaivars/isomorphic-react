'use strict';

var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var LoadSearch = require('../actions/LoadSearch');

module.exports = React.createClass({
  displayName: 'SpotifySearch',
  mixins: [Navigation],
  propTypes: {
    value: React.PropTypes.string
  },
  handleChange: function(event) {
    var value = event.target.value;
    var context = this.props.context;

    context.executeAction(LoadSearch, { query: { q: value } });
    this.transitionTo('/', null, { q:value });
    this.setState({
      value: value
    });
  },
  getInitialState: function() {
    return {
      value: this.props.value
    };
  },
  render: function() {
    return (
      <form method='GET'>
        <div className='input-group'>
          <input
               type='text'
               className='form-control'
               name='q'
               value={this.state.value}
               onChange={this.handleChange}
               autoComplete='off' />
          <span className='input-group-btn'>
            <button className='btn btn-default' type='submit'>Go!</button>
          </span>
        </div>
      </form>
    );
  }
});