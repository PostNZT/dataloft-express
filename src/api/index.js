const express = require('express')
const createFFSRouter = require('@routes/createFFSRouter')
const authRouter = require('@routes/authRouter')

const api = express()

api.use('/create', createFFSRouter)
api.use('/auth', authRouter)

module.exports = api