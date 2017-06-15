const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
};

module.exports.dev = {
    debug: true,
    devtool: 'eval-source-map',
    noInfo: false,
    entry: [
        'webpack-hot-middleware/client?reload=true',
        // reloads the page if hot module reloading fails.
        './public/StarWars',
    ],
    target: 'web',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: './public',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/, include: [
                    path.join(__dirname, 'public'),
                    path.join(__dirname, 'test'),
                ],
                loaders: ['babel'],
            },
            {
                test: /\.js$/, include: path.join(__dirname, 'test'),
                loaders: ['babel'],
            },
            {
                test: /\.css$/,
                loader: 'style!css?sourceMap',
            },
            {
                test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: 'url?limit=100000&name=images/[name].[ext]',
            },
            {   test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
                loader: 'url?limit=100000&name=fonts/[name].[ext]',
            },
        ],
    },
    sassLoader: {
        includePaths: [path.resolve('./public')],
    },
    resolve: {
        root: [path.resolve('./public')],
    },
};

module.exports.prod = {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: './public/StarWars',
    target: 'web',
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: './public',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('bundle.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/, include: [
                    path.join(__dirname, 'public'),
                    path.join(__dirname, 'test'),
                ],
                loaders: ['babel'],
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap'),
            },
            {
                test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: 'url?limit=100000&name=images/[name].[ext]',
            },
            {   test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
                loader: 'url?limit=100000&name=fonts/[name].[ext]',
            },
        ],
    },
    resolve: {
        root: [path.resolve('./public')],
    },
}
