const webpack = require('webpack')

const common = require('../common/plugins')

module.exports = [
	...common,
	new webpack.HotModuleReplacementPlugin(),
	
]
