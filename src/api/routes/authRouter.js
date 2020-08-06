const { Router } = require('express')
const  { 
    createDataloftAccount, 
    createMetamaskAccount,
    getMetamaskAddress,
    authDataloftAccount
} = require('@controllers/auth')

const authRouter = Router()

authRouter.post('/address', getMetamaskAddress)
authRouter.post('/create/dataloft', createDataloftAccount)
authRouter.post('/create/metamask', createMetamaskAccount)
authRouter.post('/user/dataloft', authDataloftAccount)
module.exports = authRouter
