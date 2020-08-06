const jwt = require('jsonwebtoken');
const dataloftAccounts = require('@modules/dataloftAccount');
const createFFSMetamaskAccount = require('@modules/createFFSMetamaskAccount');
const jwtKey = process.env.JWT_KEY;

const generateToken = (username, password, address, token) => {
  const jwt_token = jwt.sign({ username, password, address, token}, jwtKey)

  return jwt_token
}

const createDataloftAccount = async(req, res) => {
  const {
    username,
    pubEncrypt,
    encryptedKeys,
    filecoinTx
  } = req.body
  const dataloft = await new dataloftAccounts
  const is_authenticated = await dataloft.newAccount(username, pubEncrypt, encryptedKeys, filecoinTx)

  // const powergate = req.powergate
  // const user = await createFFSDataloftAccount(powergate)

  const jwt_token = generateToken(username, pubEncrypt, encryptedKeys, filecoinTx)
  const authRes = {
    token: jwt_token,
    is_authenticated
  }

  res.json(authRes)
}

const authDataloftAccount = async(req, res) => {
  const {
       username,
       password,
  } = req.body
  const dataloft = await new dataloftAccounts
  const is_authenticated = await dataloft.userAuth(username)

  // const powergate = req.powergate
  // const user = await createFFSDataloftAccount(powergate)

  const jwt_token = generateToken(username, password)
  const authRes = {
    token: jwt_token,
    is_authenticated
  }

  res.json(authRes)
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

const getMetamaskAddress = async(req, res) => {
  const {
    address
  } = req.body
  console.log(address)

  
  const metamask = {
    "address": address,
    "is_authenticated": true
  }

  res.json(metamask)

}

module.exports = { createDataloftAccount, createMetamaskAccount, getMetamaskAddress, authDataloftAccount }
