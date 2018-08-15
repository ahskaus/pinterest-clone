const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				resolve: {
					extensions: ['.js', '.jsx']
				},
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{	
				test: /\.(htm|html)$/,
				use: {
					loader: 'html-loader',
					options: {
						minimize: true
					}
				}
			},
			{	
				test: /\.css$/,
				use: [
					MiniCSSExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},
	devServer: {
		port: 3000,
		historyApiFallback: true
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
		new MiniCSSExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	]
};