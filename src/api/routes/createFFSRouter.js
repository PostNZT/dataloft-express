const { Router } = require('express')
const createFFS = require('@modules/createFFS')

const createFFSRouter = Router()

createFFSRouter.post('/', createFFS)

module.exports = createFFSRouter