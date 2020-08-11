const thread = require('@modules/threadsDb')
const threadDb = new thread
const {Libp2pCryptoIdentity} = require('@textile/threads-core');
const identityKey = process.env.THREAD_DB_ID
class dataloftAccount{

  async newAccount(username, hashPass, pubEncrypt, encryptedKeys){
    console.log(hashPass)
    const data = {
      user: username,
      hashPass: hashPass,
      pubEncrypt: pubEncrypt,
      encryptedKeys: encryptedKeys,
      filecoinTx: '',
    }
    console.log({data})
    const key = 'bbaareycsvhl4ykaj35mva6hvu2qjk6kvhin53dczo5unepfhtjln65djrttqv3vcp6pbo25olxf3wevrljaevsumb4o25jj2cpckonuifbd6rzyk52rh7hqxnoxf3s53ckyvuqckzkga6hnouu5bhrfhg2ecqr7i'
    const identity = await Libp2pCryptoIdentity.fromString(key)
    const auth = threadDb.authorize(identity)
    console.log({auth})
    const db = await threadDb.createThreadDB()
    console.log({db})
    const thread = await threadDb.start(db, identity)
    console.log({thread})
    const col = await threadDb.collectionFromObject(db)
    console.log({col})
    const query = await threadDb.createQuery(db, username)
    console.log({query})
    console.log(username)
    if (query == true)
    {
      await db.close()
      return false
    }else {
      await threadDb.addUser(db, data)
      await db.close()
      return true
    }
  }

  async userAuth(username, hashPass){
    const key = 'bbaareycsvhl4ykaj35mva6hvu2qjk6kvhin53dczo5unepfhtjln65djrttqv3vcp6pbo25olxf3wevrljaevsumb4o25jj2cpckonuifbd6rzyk52rh7hqxnoxf3s53ckyvuqckzkga6hnouu5bhrfhg2ecqr7i'
    const identity = await Libp2pCryptoIdentity.fromString(key)
    console.log({identity})
    const auth = threadDb.authorize(identity)
    const db = await threadDb.createThreadDB()
    console.log({db})
    const start = await threadDb.start(db, identity)
    console.log({start})
    const col = await threadDb.collectionFromObject(db)
    console.log({col})
    const query = await threadDb.createQuery(db, username)
    console.log({query})
    console.log(hashPass)
    if (query.hashPass == hashPass)
    {
      await db.close()
      return true
    }else {
      await db.close()
      return false
    }
  }
}

module.exports = dataloftAccount





