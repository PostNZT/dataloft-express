const { Router } = require('express')
const { getToken } = require('@controllers/auth')

const authRouter = Router()

authRouter.post('/generate', getToken)

module.exports = authRouter