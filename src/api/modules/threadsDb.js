const {Database} = require("@textile/threads-database")
const ThreadID = require("@textile/threads-id")
const {collect} = require("streaming-iterables")

const keyinfo = {key: 'bf5bmop3o7kzbwpt6s5w3jrhkau'}

const identity = process.env.THREAD_DB_ID

const obj = {
  _id: '',
  account: 'Dataloft',
  user: '',
  pubEncrypt: '',
  encryptedKeys: '',
  filcoinTx: ''
}

const level = require("level");

class threadsDb {
  constructor(name){
    this.name = name
  }

  async createThreadDB() {
    const db = await Database.withKeyInfo(keyinfo, "Dataloft-dev", undefined, undefined)
    console.log(db)
    return db
    /*await db.close()
    // This will actually "destroy" the database. This is handy here because we're "switching" rooms.
    // But it might NOT be want you want in a real-world app!
    level.destroy("dbName")
  */
  }

  async start(Database) {
    // const threadID = ThreadID.fromRandom()
    const db = Database.start(identity)
    console.log("db " + db)
    return db
  }

  async collectionFromObject(db){
    const {collections} = db
    const existing = collections.get('Users')
    if (existing) {
      return existing
    } else {
      return await db.newCollectionFromObject('Users', obj)
    }
  }

  async addUser(db, data){
    const Users = await db.collections.get('Users')
    if (!Users) throw new Error('Collection does not exist')
    console.log(Users)
    const status = await Users.insert(
      {
        _id: '',
        account: 'Dataloft',
        user: data.user,
        pubEncrypt: data.pubEncrypt,
        encryptedKeys: data.encryptedKeys,
        filecoinTx: data.filecoinTx
      },
    )
    console.log(status)
  }

  async createQuery(db, username){
    console.log(db)
    const Users = db.collections.get('Users')
    if (!Users) throw new Error('Collection does not exist')

    // Setup a query
    const query = {
      $or: [
        {user: username},
      ]
    }
    // Get results
    const all = await Users.find(query)
    // Loop over AsyncIterableIterator result and log the names
    for (const {key, value} of await collect(all)) {
      console.log(`${key.toString()}: ${value.user}`)
    }
  }
}

module.exports = threadsDb
