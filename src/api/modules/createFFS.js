const { createPow } = require('@textile/powergate-client')
const { getWalletAccount, createWalletAccount } = require('@methods/database')
const POW_HOST = process.env.POW_HOST
const powergate = createPow({ POW_HOST })


const createFFS = async(req, res) => {
  const address = req.body.address
  let user = await getWalletAccount(address)
  let TOKEN
  if (user.status === 404) {
    try{
      const { token } = await powergate.ffs.create()
      console.log(token)
      powergate.setToken(user.token)   
      user = await createWalletAccount({
        _id: address,
        address,
        token: token
      })
    } catch (e) {
      console.log(e)
    }
  }

  res.json(user)
}

module.exports = createFFS

