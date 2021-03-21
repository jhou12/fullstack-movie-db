const db = require('../mysql.js');

db.sequelize.sync({force: true})
.then(() => {
  console.log('db wiped, seeding started...')

  let arrEntries = []
  for (let i = 0; i < 5; i++) {
    arrEntries.push({testId: i, testText: 'mysql test'})
  }

  return db.Test.bulkCreate(arrEntries)
})
.then(result => {
  console.log(`db seeded with ${result.length} entries`)
})
.catch(err => console.log('seeding error:', err))
.finally(() => {
  console.log('mysql connection closing')
  db.sequelize.close()
})