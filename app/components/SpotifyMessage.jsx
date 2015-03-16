'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'SpotifyMessage',
  render: function() {
    if (!this.props.value) {
      return false;
    }
    return (
      <div className='alert alert-info' role='alert'>
        {this.props.value}
      </div>
    );
  }
});