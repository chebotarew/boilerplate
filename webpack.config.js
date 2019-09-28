const path = require('path')
const pckg = require('./package.json')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'
const paths = `./client/build/${isProd ? 'prod/' : 'dev/'}`
module.exports = {
	/* eslint-disable */
	context: require('./client/build/common/context'),
	entry: require('./client/build/common/entry'),
	resolve: require('./client/build/common/resolve'),
	optimization: require(`${paths}optimization`),
	devtool: require(`${paths}devtool`),
	mode: require(`${paths}mode`),
	output: require(`${paths}output`),
	plugins: require(`${paths}plugins`),

	/* eslint-enable */
	target: 'web',
	devServer: {
		contentBase: path.join(__dirname, 'client/assets'),
		historyApiFallback: true,
		port: 3000,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				include: __dirname,
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				include: __dirname,
			},
			{
				test: /\.pug$/,
				use: [
					{ loader: 'raw-loader' },
					{
						loader: 'pug-html-loader',
					},
				],
				exclude: /node_modules/,
				include: __dirname,
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader', // creates style nodes from JS strings
					},
					{
						loader: 'css-loader', // translates CSS into CommonJS
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
							modifyVars: {
								'primary-color': 'rgba(32, 139, 120, 0.98)',
							},
						}, // compiles Less to CSS
					},
				],
			},

			{
				test: /\.(css|scss)$/,
				loaders: ['style-loader', 'raw-loader', 'sass-loader'],
				include: __dirname,
			},
			{
				test: /\.(png|jpg|jpeg)$/,
				loaders: ['file-loader'],
				include: __dirname,
			},
		],
	},
}
