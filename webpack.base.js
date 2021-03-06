const path = require('path');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const publicDir = function (file) {
    return file ? path.resolve(__dirname, 'public', file) : path.resolve(__dirname, 'public');
};
const distDir = publicDir('dist');

module.exports = {
    context: publicDir(),
    entry: {
        index: publicDir('index.js')
    },
    devtool: 'source-map',
    output: {
        filename: '[name].[hash].js',
        path: distDir,
        publicPath: '/dist'
    },
    plugins: [
        new CleanWebpackPlugin.CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin()
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
};