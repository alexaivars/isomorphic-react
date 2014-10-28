/* jshint node:true, es3:false */

var webpack = require('webpack');

module.exports = {
  // context: __dirname + '/app',
  context: __dirname,
  entry: {
		client: ['./client.js']
	},
	plugins: [
		// new webpack.IgnorePlugin(/^react\//),
		new webpack.NormalModuleReplacementPlugin(/amd-loader/,'app/utils/ignore'),
	],
  output: {
    // path: '/build/static/js/',
		path: '/resources/js',
    filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js',
		hashDigestLength: 32
  },
	module: {
		exclude: 'amd-loader',
		loaders: [
			{ test: /\.jsx$/, loader: 'jsx-loader' }
		]
	},
	devtool: '#source-map',
  externals: {
		jquery: "jQuery",
		react: "React",
		modernizr: "Modernizr"
	}
};
