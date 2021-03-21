const db = require('../mongo.js');

let seedTest = async () => {
  try {
    let wipeDb = await db.Test.countDocuments();
    if (wipeDb) {
      await db.Test.db.dropDatabase();
      console.log('db wiped, seeding started...')
    }

    let arrEntries = []
    for (let i = 0; i < 5; i++) {
      arrEntries.push({testId: i, testText: 'mongo test'})
    }

     return db.Test.insertMany(arrEntries)
     .then(result => {
       console.log(`db seeded with ${result.length} entries`)
     })
     .catch(e => console.log('seed error', e))
     .finally(()=> {
       console.log('mongoose connection closing')
       db.mongoose.connection.close()
     })
  } catch(e) {
    console.log('seeding error:', e)
  }
}
seedTest()