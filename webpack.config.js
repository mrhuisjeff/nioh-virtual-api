var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var glob = require('glob');
var files = glob.sync('./js/app/*.js');
var ExtractTextPlugin
var newEntries = {};
const NPM_TARGET = process.env.npm_lifecycle_event;
files.forEach(function(f){
    var name = /.+\/app\/(.+)\.js/.exec(f)[1];
    newEntries[name] = f;
});

newEntries.common = ['babel-polyfill','react','jquery','utils','layer','uploader','react-dom','moment','datePicker','dataGrid','validation','loading','headerBar'];
newEntries.css = ['./css/date-picker/index.css','./css/date-picker/default.css','./css/ztree/zTreeStyle/zTreeStyle.css','lib/autocomplete/autocomplete.css'];
const config = {
    devtool: 'source-map',
    entry: newEntries,
    output: {
        path: './js/build/',
        publicPath: '/oa/js/build/',
        filename: "[name].js",
        chunkFilename: '[name].[chunkhash].js'
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
                ],
                'ignore': [
                    'lib/ztree/jquery.ztree.all-3.5.min',
                    'lib/editor'
                ]
            }
        }, {
            test: /\.jsx$/,
            loader: 'babel-loader!jsx-loader?harmony'
        }
            ,{test:/\.css$/, loaders: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")},
            {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?name=img/[hash:8].[name].[ext]&limit=8192' }]
    },
    resolve:{
        extensions: [ '.js', '.jsx'],
        alias: {
            'react':'react/dist/react.min.js',
            'react-dom':'react-dom/dist/react-dom.min.js',
            'layer':'@rlair/layer',
            'backbone' : 'backbone-min',
            "JSXTransformer": 'react/JSXTransformer',
            //'react':'react/react-with-addons.min',
            //'reactDom':'react/react-dom.min',
            'utils':'common/common',
            'ztree':'lib/ztree/jquery.ztree.all-3.5.min',
            'datePicker':'workflow/component/plugin/react-date-picker.nomoment',
            'zh-cn':'lib/lang/zh-cn',
            'uploader':'lib/plupload/js/plupload.setting',
            'validation':'@rlair/validation',
            'loading':'plug/loading',
            'headerBar':'common/header',
            'jQautocomplete':'lib/autocomplete/jquery.autocomplete',
            'dialogBox':'workflow/component/dialog.react',
            'dataGrid':'plug/data_grid',
            'selectBox':'workflow/component/plugin/select-box.react',
            'uploaderBox':'workflow/component/upload.react',
            //'kindEditor':'lib/editor/kindeditor-min',
            'kindEditor':'plug/editor',
            'userJsx':'workflow/component/plugin/user',
            'datePicker97':'lib/My97DatePicker/WdatePicker',
            'bootstrap':'lib/bootstrap/js/bootstrap.min',
            'bootbox':'lib/bootbox.min',
            'numeral':'plug/numeral'
        },
        modules: [
            'node_modules',
            path.resolve(__dirname + '/js')
        ]
    }
};

if (NPM_TARGET === 'test') {
    config.entry = ['babel-polyfill'];
    config.target = 'node';
    config.externals = [nodeExternals()];
}else {

    config.plugins = [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}

if(NPM_TARGET === 'build'){
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