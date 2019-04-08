const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.ts',
        sort: './src/sort/app-sort.ts'
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.vue', '.ejs', 'svg'],
        modules: ["node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.ejs$/,
                use: [
                    'html-loader',
                    'ejs-html-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.ejs',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'sort.html',
            template: './src/sort/sort.ejs',
            inject: false
        })
    ]
}