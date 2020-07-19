const express = require('express')
const authRouter = require('@routes/authRouter')

const api = express()

api.use('/auth', authRouter)

module.exports = api