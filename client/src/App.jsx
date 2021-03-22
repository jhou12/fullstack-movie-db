import React from 'react';
import axios from 'axios';
import MovieItem from './MovieItem.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allMovies: [{title: 'Database not connected, no movies to diplay.'}],
      display: [],
      searchResults: [],
      search: '',
      add: '',
      watchTabClicked: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleAllMoviesTab = this.handleAllMoviesTab.bind(this)
    this.handleWatchedTab = this.handleWatchedTab.bind(this)
    this.handleWatchedToggle = this.handleWatchedToggle.bind(this)
    this.handleStatsToggle = this.handleStatsToggle.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSearch(e) {
    event.preventDefault()
    this.setState({
      search: e.target.value
    })
    var matches = []
    for (var i = 0; i < this.state.allMovies.length; i++) {
      if (this.state.allMovies[i].title.toLowerCase().includes(this.state.search.toLowerCase())) {
        matches.push(this.state.allMovies[i])
      }
    }
    if (matches.length > 0) {
      this.setState({
        display: matches,
        })
    } else {
      this.setState({
        display: [{ title: 'No movie by that name found.' }]
      })
    }
  }
  handleAdd(event) {
    event.preventDefault()
    axios.post('/addMovie', {title: this.state.add})
    .then(res => {
      console.log('add res:', res.data)
    })
  }
  handleAllMoviesTab(event) {
    axios('/getMovies')
    .then(res => {
      this.setState({
        allMovies: res.data,
        display: res.data,
        watchTabClicked: false,
      })
    })
  }
  handleWatchedTab(event) {
    var watchedMovies =[]
    this.state.allMovies.forEach(movie => {
      if (movie.watched) {
        watchedMovies.push(movie)
      }
    })
    if (watchedMovies.length > 0) {
      this.setState({
        display: watchedMovies,
        watchTabClicked: true,
      })
    } else {
      this.setState({
        display: [{ title: "No movies to display."}],
        watchTabClicked: true,
      })
    }
  }
  handleWatchedToggle(event, currentStatus) {
    // console.log('watched test', currentStatus)
    var movieId = Number(event.target.className)
    axios.post('/watched', {"movieId": movieId + 1, "currentStatus": currentStatus})
    .then(res => {
      console.log('watch res data', res.data)
      this.setState({
        allMovies: res.data,
        display: res.data
      })
    })
  }
  handleStatsToggle(event, currentStatus) {
    var movieId = Number(event.target.className)
    axios.post('/visible', {"movieId": movieId + 1, "currentStatus": currentStatus})
    .then(res => {
      console.log('watch res data', res.data)
      this.setState({
        allMovies: res.data,
        display: res.data
      })
    })
  }
  componentDidMount() {
    axios.get('/getMovies')
    .then(res => {
      console.log('SERVER DATA: ', res.data)
      this.setState({
        display: res.data,
        allMovies: res.data
      })
    })
  }
  render() {
    return (
      <div>
        <h1>MovieList</h1>

        <div id="toWatchTab" className="inline search">
          <input type="text" name="search" value={this.state.search} onChange={this.handleSearch}placeholder="Search..."/>
        </div>

          <p></p>
          {!this.state.watchTabClicked ? <div className="watch inline" style={{"background-color": "forestgreen"}}onClick={this.handleAllMoviesTab} >All Movies</div> : <div className="watch inline" onClick={this.handleAllMoviesTab} >All Movies</div>}

          {this.state.watchTabClicked ? <div id="watchedTab" className="watch inline" style={{"background-color": "forestgreen"}} onClick={this.handleWatchedTab}>Watched</div> : <div id="watchedTab" className="watch inline" onClick={this.handleWatchedTab}>Watched</div>}

          <input type="text" name="add" className="inline search" value={this.state.add} onChange={this.handleChange} placeholder="Add new movie here"/>
          <button onClick={this.handleAdd}>Add</button>

        {this.state.display.map((movie, index) =>
          <MovieItem key={index} movie={movie} lookup={index} handleWatchedToggle={this.handleWatchedToggle} handleStatsToggle={this.handleStatsToggle}/>
        )}

      </div>
    );
  }
}

export default App;