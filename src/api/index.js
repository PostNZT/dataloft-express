const express = require('express')
const createFFSRouter = require('@routes/createFFSRouter')

const api = express()

api.use('/create', createFFSRouter)

module.exports = api