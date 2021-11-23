const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin")
const path = require('path')

const chromeExtensionPath = './extension_chrome/'
const firefoxExtensionPath = './extension_firefox/'
const firefoxSourcePath = './extension_firefox_source/'
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
        extensions: ['.js', '.jsx', '.ts', '...']
    },
    entry: {
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
                    from: "./{src/extension,src/common,static/extension,static/extension_firefox}/**/*",
                    to: firefoxSourcePath
                },
                {
                    from: "./*",
                    to: firefoxSourcePath
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
                    context: './static/extension_firefox/',
                    from: "**/*",
                    to: firefoxExtensionPath
                }
            ],
        }),
        new webpack.DefinePlugin({
            __SWVERSION__: `"version_${Date.now()}"`,
        })
    ]
}

module.exports = config
