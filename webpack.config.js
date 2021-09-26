const webpack = require('webpack')
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
        'ext-sw':  {
            import: './src/extension/sw.js',
            filename: 'extension/sw.js'
        },
        'ext-ff-sw':  {
            import: './src/extension_ff/sw.js',
            filename: 'extension_firefox/sw.js'
        },
        'page-sw':  {
            import: './src/webapp/sw.js',
            filename: 'webapp/sw.js'
        },
        page:  {
            import: './src/webapp/index.js',
            filename: 'webapp/index.js'
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
        new webpack.DefinePlugin({
        __SWVERSION__: `"version_${Date.now()}"`,
        })
    ]
}

module.exports = config
