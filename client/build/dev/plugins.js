const webpack = require('webpack')

const { argv } = require('yargs')
const common = require('../common/plugins')
const pckg = require('../../../package.json')

module.exports = [
	...common,
	new webpack.HotModuleReplacementPlugin(),
	new webpack.DefinePlugin({
		'process.env': {
			VER: JSON.stringify(pckg.version),
			MODE: argv.local ? JSON.stringify('dev') : null,
		},
	}),
]
