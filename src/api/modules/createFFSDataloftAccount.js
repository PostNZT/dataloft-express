const { getWalletAccount, createWalletAccount } = require('@methods/database')

const createFFSDataloftAccount = async(powergate) => {
    
  const { token } = await powergate.ffs.create()
  powergate.setToken(token)
  const { addr: address }  = await powergate.ffs.newAddr(token)

  return { address, token }
}
  
module.exports = createFFSDataloftAccount
  

  