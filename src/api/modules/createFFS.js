const { createPow } = require('@textile/powergate-client')
const { getWalletAccount, createWalletAccount } = require('@methods/database')
const POW_HOST = process.env.POW_HOST
const powergate = createPow({ POW_HOST })


const createFFS = async(req, res) => {
  const address = req.body.address
  let user = await getWalletAccount(address)
  if (!user.token) {
    console.log('pasook')
    try{
      const { token } = await powergate.ffs.create()
      powergate.setToken(token)   
      user = await createWalletAccount({
        _id: address,
        address,
        token: token
      })
      console.log(token)
      user.token = token
    } catch (e) {
      console.log(e)
    }
  }

  res.json(user)
}

module.exports = createFFS

