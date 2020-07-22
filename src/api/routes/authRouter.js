const { Router } = require('express')
const  { 
    createDataloftAccount, 
    createMetamaskAccount 
} = require('@controllers/auth')

const authRouter = Router()

authRouter.post('/create', createDataloftAccount)
authRouter.post('/create/metamask', createMetamaskAccount)

module.exports = authRouter