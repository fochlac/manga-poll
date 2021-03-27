const webpack = require('webpack')
const path = require('path')

const config = {
    mode: 'production',
    devtool: 'none',
    entry: {
        popup: './src/popup.js',
        sw: './src/sw.js'
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
