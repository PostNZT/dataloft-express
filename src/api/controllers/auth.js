const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_KEY

const generateToken = (username, password, address) => {
  const token = jwt.sign({ username, password, address}, jwtKey)

  return { token }
}

const getToken = (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const address = req.body.address

  const token = generateToken(username, password, address)
  res.json(token)
}

module.exports = { getToken }