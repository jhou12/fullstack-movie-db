const express = require('express')
const app = express()
// var cors = require('cors') // MUST INSTALL, REQUIRE, & USE CORS!!!
var bodyParser = require('body-parser') // MUST INSTALL, REQUIRE, & USE BODY PARSER TO READ REQ.BODY SERVER SIDE!!!
const port = process.env.SERVER || 3000
const dotenv = require('dotenv').config()

// var movies = require('/Users/JennyHou/Desktop/RPT/REPOS/rpt25-movie-list/server/data.js')

var mysql = require("mysql") // REMEMEBER MYSQL IS DIFFERENT THAN MSSQL!!!
var config = {
  dialect: 'mysql',
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DB,
  logging: false,
}
var connection = mysql.createConnection(config)

// app.use(cors())
app.use(bodyParser.json())
app.use(express.static('client/dist'))
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
connection.query('select * from movies', function(error, results, fields) {
  if (error) {
    throw error
  }
  console.log('solution is ', results)
  res.send(results)
})
})

app.get('/api/movies', (req, res) => {
  // throw new Error;
  connection.query('select * from movies limit 5', function(error, results, fields) {
    if (error) {
      res.status(404).send('get movies error')

    } else {
      console.log('db data returned is ', results)
      var dbresults = []
      for (var i = 0; i < results.length; i++) {
        var movie = {}
        movie.stats = {}
        movie.title = results[i].title
        movie.watched = results[i].watched
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

app.post('/api/movie/:id', (req, res) => {
  console.log('REQ BODY', req.body)
  var searched = req.body.query
    var newmovies = []
    for (var i = 0; i < movies.length; i++) {
      if (movies[i].title.includes(searched)) {
        newmovies.push(movies[i])
      }
    }
    if (newmovies.length === 0) {
      newmovies.push({ title: 'No movie by that name found.' })
    }
    // console.log('NEWMOVIES', newmovies)
  res.send(newmovies)
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

app.post('/newmovie', (req, res) => {
  console.log('new movie req!')
})

app.listen(port, () => {
  console.log('Listening at port ' + port)
})