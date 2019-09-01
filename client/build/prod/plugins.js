const webpack = require('webpack')
const path = require('path')

const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = [
	// new CleanWebpackPlugin(),
	new CopyPlugin([
		{ from: path.resolve(__dirname, '../../assets'), to: path.resolve(__dirname, '../../../static') },
	]),
]
