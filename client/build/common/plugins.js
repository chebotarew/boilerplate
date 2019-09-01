const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: path.resolve(__dirname, '../../src/index.pug'),
	}),
]
