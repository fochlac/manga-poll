const webpack = require('webpack')
const path = require('path')

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        popup: './src/extension/popup.js',
        sw: './src/extension/sw.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
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
