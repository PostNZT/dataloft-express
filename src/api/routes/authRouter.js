const { Router } = require('express')
const  createDataloftAccount = require('@controllers/auth')

const authRouter = Router()

authRouter.post('/create', createDataloftAccount)

module.exports = authRouter