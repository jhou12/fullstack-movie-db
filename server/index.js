const express = require('express')
const app = express()
const port = process.env.SERVER || 3000
const axios = require('axios')
const dotenv = require('dotenv').config()
const mysql = require("mysql")

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

app.get('/api/movies', (req, res) => {
  connection.query('select * from movies', function(error, results, fields) {
    if (error) {
      res.status(404).send('get movies error')
    } else {
      var dbresults = []
      for (var i = 0; i < results.length; i++) {
        var movie = {}
        movie.title = results[i].title
        movie.watched = results[i].watched
        movie.stats = {}
        movie.statsVisible = results[i].statsVisible
        movie.stats.Year = results[i].year
        movie.stats.Runtime = results[i].runtime
        movie.stats.Metascore = results[i].metascore
        movie.stats.imdbRating = results[i].imdb
        dbresults.push(movie)
      }
      res.send(dbresults)
    }
  })
})

app.post('/addMovie', (req, res) => {
  console.log('new movie req!',req.body)
})

app.post('/watched', (req, res) => {
  connection.query(`select * from movies where id=${req.body.movieId}`, function(error, results, fields) {
    if (error) {
      throw error
    } else {
      var current = results[0].watched
      connection.query(`update movies set watched=${!current} where id=${req.body.movieId}`, function(error, results, fields) {
        if (error) {
          throw error
        }
        res.send('watch status changed!')
      })
    }
  })
})

app.listen(port, () => {
  console.log('Listening at port ' + port)
})