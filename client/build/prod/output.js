const path = require('path')

module.exports = {
	path: path.join(__dirname, '../../../static'),
	filename: 'bundle.[contenthash].js',
	publicPath: '../../../static',
}
