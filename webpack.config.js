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
        'ext-sw':  {
            import: './src/extension/sw.js',
            filename: 'extension/sw.js'
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
    }
}

module.exports = config
