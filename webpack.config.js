const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin")
const path = require('path')

const chromeExtensionPath = './extension_chrome/'
const firefoxExtensionPath = './extension_firefox/'

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        popup: {
            import: './src/extension/popup.js',
            filename: chromeExtensionPath + 'popup.js'
        },
        'ext-sw': {
            import: './src/extension/sw.js',
            filename: chromeExtensionPath + 'sw.js'
        },
        'popup-firefox': {
            import: './src/extension/popup.js',
            filename: firefoxExtensionPath + 'popup.js'
        },
        'ext-ff-sw': {
            import: './src/extension/sw.js',
            filename: firefoxExtensionPath + 'sw.js'
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
                    from: "./src/extension/*.{html,css}",
                    to: "extension/[name][ext]"
                },
                {
                    from: "./src/extension/popup.html",
                    to: firefoxExtensionPath + "[name][ext]"
                },
                {
                    from: "./src/extension/*.{html,css}",
                    to: firefoxExtensionPath + "[name][ext]"
                },
                {
                    from: "./static/web/*",
                    to: "web/[name][ext]"
                },
                {
                    from: "**/*",
                    to: chromeExtensionPath,
                    context: './static/extension/'
                },
                {
                    from: "**/*",
                    to: firefoxExtensionPath,
                    context: './static/extension/'
                },
                {
                    from: "**/*",
                    to: firefoxExtensionPath,
                    context: './static/extension_ff/'
                },
                {
                    from: "**/*",
                    to: chromeExtensionPath,
                    context: './static/extension_chrome/'
                }
            ],
        }),
        new webpack.DefinePlugin({
            __SWVERSION__: `"version_${Date.now()}"`,
        })
    ]
}

module.exports = config
