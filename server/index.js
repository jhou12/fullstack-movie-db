const express = require('express')
const app = express()
const port = process.env.SERVER || 3000
const axios = require('axios')
const dotenv = require('dotenv').config()
const mysql = require("mysql")
const db = require('../database/mysql.js')

var config = {
  dialect: 'mysql',
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DB,
  logging: false,
}
var connection = mysql.createConnection(config)

app.use(express.static('client/dist'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let formatResData = (resArray) => {
  var formattedData = []
  for (var i = 0; i < resArray.length; i++) {
    var movie = {}
    movie.id = resArray[i].id
    movie.title = resArray[i].title
    movie.watched = resArray[i].watched
    movie.stats = {}
    movie.statsVisible = resArray[i].statsVisible
    movie.stats.Year = resArray[i].year
    movie.stats.Runtime = resArray[i].runtime
    movie.stats.Metascore = resArray[i].metascore
    movie.stats.imdbRating = resArray[i].imdb
    formattedData.push(movie)
  }
  return formattedData
}

app.get('/getMovies', (req, res) => {
  db.getMovies((error, results, fields) => {
    if (error) {
      res.status(404).send('get movies error')
    } else {
      res.status(200).send(formatResData(results))
    }
  })
})

app.post('/addMovie', (req, res) => {
  db.postMovie(req.body.title, (error, results, fields) => {
        if (error) {
          res.status(404).send('server add movies error')
        } else {
          res.status(200).send(formatResData(results))
        }
  })
})

app.put('/watched', (req, res) => {
  db.updateWatched(req.body, function(error, results, fields) {
        if (error) {
          res.status(404).send('server update watched error')
        } else {
          res.status(200).send(formatResData(results))
        }
  })
})

app.put('/visible', (req, res) => {
  db.updateVisible(req.body, function(error, results, fields) {
        if (error) {
          res.status(404).send('server update visible error')
        } else {
          res.status(200).send(formatResData(results))
        }
  })
})

app.delete('/deleteMovie', (req, res) => {
  db.deleteMovie(req.body.id, (error, results, fields) => {
        if (error) {
          res.status(404).send('server delete movie error')
        } else {
          res.status(200).send(formatResData(results))
        }
  })
})

app.listen(port, () => {
  console.log('Listening at port ' + port)
})