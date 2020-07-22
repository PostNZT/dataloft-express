const { createPow } = require('@textile/powergate-client')
const POW_HOST = process.env.POW_HOST


const constants = (req, res, next) => {
    req.powergate = createPow({ POW_HOST })
    next()
}

module.exports = constants