const mysql = require("mysql")
const dotenv = require('dotenv').config()

var config = {
  dialect: 'mysql',
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DB,
  logging: false,
}
var connection = mysql.createConnection(config)

let getMovies = (cb) => {
  connection.query('select * from movies', (error, results, fields) => {
    if (error) {
      cb(error)
    } else {
      cb(null, results)
    }
  })
}

let postMovie = (title, cb) => {
  connection.query(`INSERT INTO movies (title, watched, statsVisible) VALUES ('${title}', 0, 0)`, (error, results, fields) => {
    if (error) {
      cb(error)
    } else {
      getMovies(cb)
    }
  })
}

let updateWatched = (movie, cb) => {
  connection.query(`update movies set watched=${!movie.currentStatus} where id=${movie.id}`, (error, results, fields) => {
    if (error) {
      cb(error)
    } else {
      getMovies(cb)
    }
  })
}

let updateVisible = (movie, cb) => {
  connection.query(`update movies set statsVisible=${!movie.currentStatus} where id=${movie.id}`, (error, results, fields) => {
    if (error) {
      cb(error)
    } else {
      getMovies(cb)
    }
  })
}

let deleteMovie = (id, cb) => {
  connection.query(`DELETE FROM movies WHERE id=${id};`, (error, results, fields) => {
    if (error) {
      cb(error)
    } else {
      getMovies(cb)
    }
  })
}

module.exports = {
  getMovies,
  postMovie,
  updateWatched,
  updateVisible,
  deleteMovie,
}