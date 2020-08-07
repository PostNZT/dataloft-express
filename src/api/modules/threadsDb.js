const {Database} = require("@textile/threads-database")
const ThreadID = require("@textile/threads-id")
const {collect} = require("streaming-iterables")
const {Client} = require("@textile/threads-client")

const keyinfo = {key: 'b5ooffdsnc4nrdraiiwglkuxe5y'}

const identity = 'bafy2bzaceciaiyknlevym7e7qi3bbs5o4p25tvrvwhneyorecu2qgzsa4tako'

const obj = {
  _id: '',
  account: 'Dataloft',
  user: '',
  pubEncrypt: '',
  encryptedKeys: '',
  filcoinTx: '',
  rand: '',
}

const level = require("level");

class threadsDb {
  constructor(name){
    this.name = name
  }

    async authorize (identity) {
    const client = await Client.withKeyInfo(keyinfo)
    await client.getToken(identity)
    return client
  }

    async createThreadDB() {
    const db = await Database.withKeyInfo(keyinfo, "dataloft", undefined, undefined)
    console.log(db)
    return db
    /*await db.close()
    // This will actually "destroy" the database. This is handy here because we're "switching" rooms.
    // But it might NOT be want you want in a real-world app!
    level.destroy("dbName")
  */
  }

  async start(Database, identity) {
    // const threadID = ThreadID.fromRandom()
    // const close = await Database.close()
    // console.log({close})
    const db = await Database.start(identity)
    console.log({db})
    return db
  }

   async collectionFromObject(db){
      const existing = await db.collections.get('Users')
      console.log({existing})
      if (existing) {
         return existing
      } else {
        const col = await db.newCollectionFromObject('Users', obj)
         return col
      }
  }

  async addUser(db, data){
    const Users = await db.collections.get('Users')
    if (!Users) throw new Error('Collection does not exist')
    console.log({Users})
    const status = await Users.insert(
      {
        _id: '',
        account: 'Dataloft',
        user: data.user,
        pubEncrypt: data.pubEncrypt,
        encryptedKeys: data.encryptedKeys,
        filecoinTx: data.filecoinTx,
        rand: Math.random().toString(),
      },
    )
    await db.close()
    const thread = await threadDb.start(db, identity)
    console.log({status})
    return status
  }

  async createQuery(db, username){
    console.log(db)
    const Users = await db.collections.get('Users')
    if (!Users) throw new Error('Collection does not exist')
    console.log({Users})
    // Setup a query
    const query = {
      $or: [
        {user: username},
      ]
    }
    // Get results
    const all = await Users.find(query)
    // const find =  new Promise((resolve, reject) => {
    //   Users.find(query, (result) => {
    //     resolve(result)
    //   })
    // })

    // const all = await Promise.all([find])
    //Loop over AsyncIterableIterator result and log the names
    for (const {key, value} of await collect(all)) {
      console.log(`${key.toString()}: ${value.user}`)
      return true
    }
    return false

  }
}

module.exports = threadsDb
