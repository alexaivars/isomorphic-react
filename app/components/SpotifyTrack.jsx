'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var SpotifyAlbumCover = React.createClass({
  render: function() {
    var url;
    try {
      url = this.props.model.images[1].url;
    } catch(e) {
      return false;
    }
    return this.transferPropsTo(
      <figure>
        <img className='img-responsive img-rounded' src={url} />
      </figure>
    );
  }
});

module.exports = React.createClass({
  mixins: [Router.State],
  render: function() {
    if (!this.props.model) {
      return false;
    }

    var model = this.props.model;
    var query = this.getQuery();

    return (
      <article className='row'>
        <Link to="/" query={query}>
        <SpotifyAlbumCover className='col-xs-3' model={model.album} />
        <div className='col-xs-9'>
          <h2 className='h5'>{model.album.name}</h2>
          <h1 className='h4'>{model.name}</h1>
        </div>
        </Link>
      </article>
    );
  }
});