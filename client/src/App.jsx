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
    this.handleToggle = this.handleToggle.bind(this)
    this.handleWatchedTab = this.handleWatchedTab.bind(this)
    this.handleAllMoviesTab = this.handleAllMoviesTab.bind(this)
    this.handleStats = this.handleStats.bind(this)
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
  handleToggle(event) {
    console.log('APP TOGGLE RUN')
    var movieId = event.target.className
    axios.post('/watched', {"movieId": movieId})
    .then(res => {
      console.log(res.data)
    })
    var newstate = this.state.data.slice()
    newstate[event.target.className].watched = !newstate[event.target.className].watched
    this.setState({
      allMovies: newstate
    })
  }
  handleWatchedTab(event) {
    console.log('handlewatchedTab clicked')
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
        display: [{ title: "No movies to display."}]
      })
    }
  }
  handleAllMoviesTab(event) {
    console.log('handleAllMoviesTab clicked')
    axios('/api/movies')
    .then(res => {
      this.setState({
        allMovies: res.data,
        display: res.data,
        watchTabClicked: false,
      })
    })
  }
  handleStats(event) {
    var newstate = this.state.data
    newstate[event.target.className].statsVisible = !newstate[event.target.className].statsVisible
    this.setState({
      allMovies: newstate
    })
  }
  componentDidMount() {
    axios.get('/api/movies')
    .then(res => {
      const serverMovies = res.data
      console.log('SERVER DATA: ', serverMovies)
      this.setState({
        display: serverMovies,
        allMovies: serverMovies
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
          <form>

          {!this.state.watchTabClicked ? <div className="watch inline" style={{"background-color": "forestgreen"}}onClick={this.handleAllMoviesTab} >All Movies</div> : <div className="watch inline" onClick={this.handleAllMoviesTab} >All Movies</div>}

          {this.state.watchTabClicked ? <div id="watchedTab" className="watch inline" style={{"background-color": "forestgreen"}} onClick={this.handleWatchedTab}>Watched</div> : <div id="watchedTab" className="watch inline" onClick={this.handleWatchedTab}>Watched</div>}

          <input type="text" name="add" className="inline search" value={this.state.add} onChange={this.handleChange} placeholder="Add new movie here"/>
          <button onClick={this.handleAdd}>Add</button>
        </form>

        {this.state.display.map((movie, index) =>
          <MovieItem key={index} movie={movie} lookup={index} handleToggle={this.handleToggle} handleStats={this.handleStats}/>
        )}
      </div>
    );
  }
}

export default App;