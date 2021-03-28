const baseconfig = require('./webpack.config')

const config = {
    ...baseconfig,
    mode: 'production',
    devtool: 'none'
}

module.exports = config
