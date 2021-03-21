const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.SERVER || 3000

// const db = require('../database/mysql.js') // USE FOR MYSQL
// const db = require('../database/mongo.js') // USE FOR MONGO

app.use(express.static('client/dist'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/read', async (req, res) => {
  try {
    let entries = await db.readAll()
    res.status(200).send(entries)
  } catch(e) {
    console.log('server GET error, sending fallback data.', e)
    res.send([])
  }
})

app.listen(port, () => {
  console.log(`Listening at port ${port}.`)
})