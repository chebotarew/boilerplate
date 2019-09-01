const path = require('path')

module.exports = {
	path: path.join(__dirname, '../../../server/static'),
	filename: 'bundle.[contenthash].js',
	publicPath: './',
}
