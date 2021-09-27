const baseconfig = require('./webpack.config')

const config = {
    ...baseconfig,
    mode: 'production',
    devtool: false
}

module.exports = config
