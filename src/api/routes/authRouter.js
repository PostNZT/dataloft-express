const { Router } = require('express')
const  { 
    createDataloftAccount, 
    createMetamaskAccount,
    getMetamaskAddress
} = require('@controllers/auth')

const authRouter = Router()

authRouter.post('/address', getMetamaskAddress)
authRouter.post('/create/dataloft', createDataloftAccount)
authRouter.post('/create/metamask', createMetamaskAccount)

module.exports = authRouter