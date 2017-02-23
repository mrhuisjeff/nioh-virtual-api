var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const NPM_TARGET = process.env.npm_lifecycle_event;

const config = {
    devtool: 'source-map',
    entry: ['babel-polyfill', 'app.js'],
    output: {
        path: './dist',
        publicPath: '/',
        filename: "[name].[hash].js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: [
                    'react',
                    'es2015',
                    'stage-0'
                ]
            }
        }
            , {test: /\.css$/, loaders: ExtractTextPlugin.extract({fallback:"style-loader", use: "css-loader"})},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract({fallback:"style-loader", use: "css-loader!sass-loader"})},
            {test: /\.less$/, loader: ExtractTextPlugin.extract({fallback:"style-loader", use: "css-loader!less-loader"})},
            {
                test: /\.html$/,
                loader: 'html-loader?attrs=link:href'
            },
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?name=img/[hash:8].[name].[ext]&limit=8192'}]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules',
            path.resolve(__dirname + '/src/webapp')
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDom"
    }
};

if (NPM_TARGET === 'test') {
    config.entry = ['babel-polyfill'];
    config.target = 'node';
    config.externals = [nodeExternals()];
} else {

    config.plugins = [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("[name].css"),
        //new webpack.ProvidePlugin({
        //    $: 'jquery',
        //    jQuery: 'jquery'
        //}),
        new HtmlWebpackPlugin({
            filename: 'root.html',
            inject: 'body',
            template: 'src/webapp/root.html'
        })
    ]
}

if (NPM_TARGET === 'build') {
    delete config.devtool;
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false  // remove all comments
        },
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
        },
        sourceMap: true,
        mangle: true
    }));
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    );
}

module.exports = config;