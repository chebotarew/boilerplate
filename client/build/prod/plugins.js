const path = require('path')
const common = require('../common/plugins')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = [
	new CleanWebpackPlugin(),
	new CopyPlugin([
		{ from: path.resolve(__dirname, '../../assets'), to: path.resolve(__dirname, '../../../server/static') },
	]),
	...common,
]
