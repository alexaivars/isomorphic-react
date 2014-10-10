/** @jsx React.DOM */

define(function(require, exports, module) {
	var React = require('react');
	
	var SearchInput = React.createClass({
		handleChange: function(event) {
			try {
				this.props.onChange(event.target.value);
			} catch (e) {
				console.log('missing onChange handler');
			}
		},
		render: function() {
			var query = this.props.value;
			var changeHandler = this.handleChange;
			return (
				<form>
					<input type='text' value={query} onChange={changeHandler}/>
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
			<ul>
			{items.map(function (item) {
				return <li key={item.id}>
					<a href={item.href}>{item.name}</a>
				</li>;
			})}
			</ul>
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
				<div>
					<h1>Spotify search</h1>
					<p>{message}</p>
					<SpotifyTracks model={tracks}/>
					<SearchInput value={query} onChange={this.search}/>
				</div>
			);
		}
	});
});
