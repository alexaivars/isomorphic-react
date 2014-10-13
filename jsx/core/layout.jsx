/** @jsx React.DOM */

define(function(require, exports, module) {
	var React = require('react');
	
	var SpotifySearch = React.createClass({
		displayName: 'SpotifySearch',
		propTypes: {
			value: React.PropTypes.string,
			onChange: React.PropTypes.func.isRequired
		},
		handleChange: function(event) {

			var value = event.target.value;

			this.props.onChange(value);
			this.setState({
				value: value
			});

		},
		getInitialState: function() {
			return {
				value: this.props.value
			}
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

	var SpotifyTracks = React.createClass({
		render: function() {
			if(!this.props.model) {
				return false;
			}
			var items = this.props.model.items;
			return (
			<ul className='list-group'>
			{items.map(function (item) {
				return <li key={item.id} className='list-group-item'>
					<SpotifyTrack model={item}/>
				</li>;
			})}
			</ul>
			);
		}
	});
	
	var SpotifyAlbumCover = React.createClass({
		render: function() {	
			var url;
			try { 
				url = this.props.model.images[1].url
			} catch(e) {
				console.log('album missing covere image', this.props.model)
				return false;
			}
			return this.transferPropsTo(
				<figure>
					<img className='img-responsive img-rounded' src={url}/>
				</figure>
			);
		}
	});

	var SpotifyTrack = React.createClass({
		render: function() {
			if(!this.props.model) {
				return false;
			}
			
			var model = this.props.model;

			return (
				<article className='row'>
					<SpotifyAlbumCover className='col-xs-3' model={model.album} />
					<div className='col-xs-9'>
						<h2 className='h5'>{model.album.name}</h2>
						<h1 className='h4'>{model.name}</h1>
					</div>
				</article>
			);
		}
	});

	var Alert = React.createClass({
		render: function() {
			if(!this.props.value) {
				return false;
			}
			
			return (
				<div className='alert alert-info' role='alert'>{this.props.value}</div>
			);
		}
	});

	module.exports = React.createClass({
		search: function(value) {
			try {
				var router = this.props.router;
				router.setRoute('/?q=' + value);
			} catch(e) {
				console.log(e);
			}	
		},
		render: function() {
			var error = this.props.model.error;	
			var message = '';
			var query = '';
			var tracks = this.props.model.tracks;

			try {
				message = error.message;
			} catch(e) {
			}
			try {
				query = this.props.model.meta.query.q;
			} catch(e) {
			}
				
			return (
				<div className='container-fluid'>
					<div className='jumbotron'>
						<h1>Spotify search</h1>
					</div>
					<div className='spotify-search'>
						<SpotifySearch value={query} onChange={this.search}/>
						<SpotifyTracks model={tracks}/>
						<Alert value={message}/>
					</div>
				</div>
			);
		}
	});
});
