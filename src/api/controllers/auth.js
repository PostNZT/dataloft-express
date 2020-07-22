const jwt = require('jsonwebtoken')
const createFFSDataloftAccount = require('@modules/createFFSDataloftAccount')
const createFFSMetamaskAccount = require('@modules/createFFSMetamaskAccount')
const jwtKey = process.env.JWT_KEY

const generateToken = (username, password, address, token) => {
  const jwt_token = jwt.sign({ username, password, address, token}, jwtKey)

  return jwt_token
}

const createDataloftAccount = async(req, res) => {
  const {
    username,
    password,
  } = req.body

  const powergate = req.powergate
  const user = await createFFSDataloftAccount(powergate)
  const jwt_token = generateToken(username, password, user.address, user.token)

  res.json(jwt_token)
}

const createMetamaskAccount = async(req, res) => {
  const {
    username,
    password,
    address
  } = req.body
  const powergate = req.powergate
  const user = await createFFSMetamaskAccount(powergate, address)
  const jwt_token = generateToken(username, password, user.address, user.token)

  res.json(jwt_token)
}

module.exports = { createDataloftAccount, createMetamaskAccount }