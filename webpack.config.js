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
		contentBase: path.join(__dirname, 'client/static'),
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
						query: {
							data: { version: pckg.version },
						},
					},
				],
				exclude: /node_modules/,
				include: __dirname,
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
						options: {
							modifyVars: {
								'primary-color': '#4ac126',
								'danger-color': '#ff2432',
								'border-radius-base': '2px',
							},
							javascriptEnabled: true,
						},
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
				loaders: ['raw-loader'],
				include: __dirname,
			},
		],
	},
}
