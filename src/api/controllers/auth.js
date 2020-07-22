const jwt = require('jsonwebtoken')
const createFFS = require('@modules/createFFS')
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
  const { addr } = await powergate.ffs.newAddr()
  console.log({addr})
  const user = await createFFS(addr)
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
  const user = await createFFS(powergate, address)
  const jwt_token = generateToken(username, password, user.address, user.token)

  res.json(jwt_token)
}

module.exports = { createDataloftAccount, createMetamaskAccount }