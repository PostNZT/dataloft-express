const thread = require('@modules/threadsDb')
const threadDb = new thread
const {Libp2pCryptoIdentity} = require('@textile/threads-core');
const identityKey = process.env.THREAD_DB_ID
class dataloftAccount{

  async newAccount(username, pubEncrypt, encryptedKeys, filecoinTx){
    const data = {
      user: username,
      pubEncrypt: pubEncrypt,
      encryptedKeys: encryptedKeys,
      filecoinTx: filecoinTx
    }
    /** Random new identity */
    const identity = await Libp2pCryptoIdentity.fromRandom()

    /** Convert to string. */
    //const identityString = await identity.toString()

    /** Restore an identity object from a string */
    // const restored = Libp2pCryptoIdentity.fromString(identityString)
    // console.log(restored)
    const db = await threadDb.createThreadDB()
    await threadDb.start(db, identity)
    await threadDb.collectionFromObject(db)
    const query = await threadDb.createQuery(db, username)
    if (query && query.length > 0)
    {
      const auth = false
      return auth
    }else {
      const addUser = threadDb.addUser(db, data)
      const auth = true
      return auth
    }
  }

  async userAuth(username){
    const key = 'bbaareycsvhl4ykaj35mva6hvu2qjk6kvhin53dczo5unepfhtjln65djrttqv3vcp6pbo25olxf3wevrljaevsumb4o25jj2cpckonuifbd6rzyk52rh7hqxnoxf3s53ckyvuqckzkga6hnouu5bhrfhg2ecqr7i'
    const identity = await Libp2pCryptoIdentity.fromString(key)

    const db = await threadDb.createThreadDB()
    await threadDb.start(db, identity)
    await threadDb.collectionFromObject(db)
    const query = await threadDb.createQuery(db, username)
    console.log(query)
    if (query && query.length > 0)
    {
      const auth = true
      return auth
    }else {
      const auth = false
      return auth
    }
  }
}

module.exports = dataloftAccount





