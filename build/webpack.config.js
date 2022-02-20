const path = require('path');
const VueLoaderPlugin = require('vue-loader/dist/plugin').default
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.ts',
        sort: './src/sort/app-sort.ts',
        maze: './src/maze/app-maze.ts'
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
                test: /\.(png|jpg|gif|svg)$/i,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: false,
            minify: true
        }),
        new HtmlWebpackPlugin({
            filename: 'sort.html',
            template: './src/sort/sort.html',
            inject: false,
            minify: true
        }),
        new HtmlWebpackPlugin({
            filename: 'maze.html',
            template: './src/maze/maze.html',
            inject: false,
            minify: true
        })
    ]
}