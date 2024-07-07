const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin")
const path = require('path')

const chromeExtensionPath = './extension_chrome/'
const firefoxExtensionPath = './extension_firefox/'
const webappPath = './web/'

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        alias: {
            "react": "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",     // Must be below test-utils
            "react/jsx-runtime": "preact/jsx-runtime"
        },
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "https": require.resolve("https-browserify"),
            "http": require.resolve("stream-http"),
            "zlib": require.resolve("browserify-zlib")
        },
        extensions: ['.js', '.jsx', '.ts', '...']
    },
    entry: {
        preact: {
            import: './src/web/index.js',
            filename: webappPath + 'index.js'
        },
        bookmark: {
            import: './src/extension/test-bookmark.js',
            filename: chromeExtensionPath + 'test-bookmark.js'
        },
        content: {
            import: './src/extension/content-script.js',
            filename: chromeExtensionPath + 'content-script.js'
        },
        popup: {
            import: './src/extension/popup/popup.js',
            filename: chromeExtensionPath + 'popup.js'
        },
        'ext-sw': {
            import: './src/extension/service-worker/sw.js',
            filename: chromeExtensionPath + 'sw.js'
        },
        'bookmark-firefox': {
            import: './src/extension/test-bookmark.js',
            filename: firefoxExtensionPath + 'test-bookmark.js'
        },
        'content-firefox': {
            import: './src/extension/content-script.js',
            filename: firefoxExtensionPath + 'content-script.js'
        },
        'popup-firefox': {
            import: './src/extension/popup/popup.js',
            filename: firefoxExtensionPath + 'popup.js'
        },
        'ext-ff-sw': {
            import: './src/extension/service-worker/sw.js',
            filename: firefoxExtensionPath + 'sw.js'
        },
        'page-sw': {
            import: './src/web/sw/sw.js',
            filename: webappPath + 'sw.js'
        },
        stats: {
            import: './src/web/stats/stats.js',
            filename: webappPath + 'stats.js'
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "./static/web/*",
                    to: webappPath + "[name][ext]"
                },
                {
                    context: './static/extension/',
                    from: "**/*",
                    to: chromeExtensionPath
                },
                {
                    context: './static/extension/',
                    from: "**/*",
                    to: firefoxExtensionPath
                },
                {
                    context: './static/extension/',
                    from: "**/*",
                    to: firefoxExtensionPath
                },
                {
                    context: './static/extension_chrome/',
                    from: "**/*",
                    to: chromeExtensionPath
                },
                {
                    context: './static/extension_firefox/',
                    from: "**/*",
                    to: firefoxExtensionPath
                }
            ],
        }),
        new webpack.DefinePlugin({
            __SWVERSION__: `"version_${Date.now()}"`,
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser.js',
        })
    ]
}

module.exports = config
