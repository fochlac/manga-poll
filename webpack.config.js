const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin")
const path = require('path')

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        popup: {
            import: './src/extension/popup.js',
            filename: 'extension/popup.js'
        },
        'popup-firefox': {
            import: './src/extension_ff/popup.js',
            filename: 'extension_firefox/popup.js'
        },
        'ext-sw': {
            import: './src/extension/sw.js',
            filename: 'extension/sw.js'
        },
        'ext-ff-sw': {
            import: './src/extension_ff/sw.js',
            filename: 'extension_firefox/sw.js'
        },
        'page-sw': {
            import: './src/web/sw/sw.js',
            filename: 'web/sw.js'
        },
        page: {
            import: './src/web/app/index.js',
            filename: 'web/index.js'
        },
        stats: {
            import: './src/web/stats/stats.js',
            filename: 'web/stats.js'
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/web/**/*.{html,css}",
                    to: "web/[name][ext]"
                },
                {
                    from: "./src/extension/*.{html,css,json}",
                    to: "extension/[name][ext]"
                },
                {
                    from: "./src/extension/popup.html",
                    to: "extension_firefox/[name][ext]"
                },
                {
                    from: "./src/extension_ff/*.{html,css,json}",
                    to: "extension_firefox/[name][ext]"
                },
                {
                    from: "./static/web/*",
                    to: "web/[name][ext]"
                },
                {
                    from: "**/*",
                    to: "./extension/",
                    context: './static/extension/'
                },
                {
                    from: "**/*",
                    to: "./extension_firefox/",
                    context: './static/extension/'
                }
            ],
        }),
        new webpack.DefinePlugin({
            __SWVERSION__: `"version_${Date.now()}"`,
        })
    ]
}

module.exports = config
