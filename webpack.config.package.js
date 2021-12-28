const baseconfig = require('./webpack.config')

const config = {
    ...baseconfig,
    devtool: false
}

module.exports = config
