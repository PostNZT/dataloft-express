const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_KEY

const generateToken = (username, password, address) => {
  const token = jwt.sign({ username, password, address}, jwtKey)

  return { token }
}