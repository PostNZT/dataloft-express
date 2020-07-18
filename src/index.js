require('dotenv').config()
require('module-alias/register')

const api = require('./api')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT

app.use(bodyParser.json({limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use('/api/v1', api)
app.listen(port, () => console.log(`SERVER RUNNING ON http://51.89.229.229:${port}`))