const { getWalletAccount, createWalletAccount } = require('@methods/database')

const createFFSMetamaskAccount = async(powergate, address) => {
  let user = await getWalletAccount(address)
  if (!user.token) {
    try{
      const { token } = await powergate.ffs.create()
      powergate.setToken(token)   
      user = await createWalletAccount({
        _id: address,
        address,
        token: token
      })
      user.token = token
    } catch (e) {
      console.log(e)
    }
  }
  console.log(user)
  return user
}

module.exports = createFFSMetamaskAccount

