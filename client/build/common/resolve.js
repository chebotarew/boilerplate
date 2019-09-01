const path = require('path')

module.exports = {
	alias: {
		Src: path.resolve(__dirname, '../../src/'),
	},
	extensions: ['.js', '.jsx', '.ts', '.tsx'],
}
