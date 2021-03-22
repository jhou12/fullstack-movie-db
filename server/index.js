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

let formatResData = (resArray) => {
  var formattedData = []
  for (var i = 0; i < resArray.length; i++) {
    var movie = {}
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
  connection.query('select * from movies', function(error, results, fields) {
    if (error) {
      res.status(404).send('get movies error')
    } else {
      console.log('server test', results)
      res.status(200).send(formatResData(results))
    }
  })
})

app.post('/addMovie', (req, res) => {
  console.log('new movie req!',req.body)
})

app.post('/watched', (req, res) => {
  // console.log('watched send from client', req.body)
  connection.query(`update movies set watched=${!req.body.currentStatus} where id=${req.body.movieId}`, function(error, results, fields) {
    if (error) {
      res.status(400).send('server watched status error')
    } else {
      connection.query('select * from movies', function(error, results, fields) {
        if (error) {
          res.status(404).send('server get movies error')
        } else {
          console.log('server test', results)
          res.status(200).send(formatResData(results))
        }
      })
    }
  })
}
)

app.listen(port, () => {
  console.log('Listening at port ' + port)
})