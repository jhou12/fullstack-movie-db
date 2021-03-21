import React from 'react';
import axios from 'axios';
import MovieItem from './MovieItem.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [{title: 'Database not connected, no movies to diplay.'}],
      search: '',
      title: '',
      watching: [],
      data: '',
      add: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleWatched = this.handleWatched.bind(this)
    this.handleToWatch = this.handleToWatch.bind(this)
    this.handleStats = this.handleStats.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    console.log('SUBMIT CLICKED!')
    var id = 1
    axios.post(`/api/movie/${id}`,{ data: {query: this.state.search }})
    .then(res => {
      this.setState({
        results: res.data
      })
    })
  }
  handleAdd(event) {
    event.preventDefault()
    axios.post('/newmovie', this.state.add)
    .then(res => {
      console.log('add res:', res.data)
    })
  }
  handleToggle(event) {
    console.log('APP TOGGLE RUN')
    var movieId = event.target.className
    axios.post('http://localhost:3000/watched', {"movieId": movieId})
    .then(res => {
      console.log(res.data)
    })
    var newstate = this.state.data.slice()
    newstate[event.target.className].watched = !newstate[event.target.className].watched
    this.setState({
      results: newstate
    })
  }
  handleWatched(event) {
    var data = this.state.data
    var newarr =[]
    data.forEach(movie => {
      if (movie.watched) {
        newarr.push(movie)
      }
    })
    this.setState({
      results: newarr
    })
  }
  handleToWatch(event) {
    var data = this.state.data
    var newarr =[]
    data.forEach(movie => {
      if (!movie.watched) {
        newarr.push(movie)
      }
    })
    this.setState({
      results: newarr
    })
  }
  handleStats(event) {
    var newstate = this.state.data
    newstate[event.target.className].statsVisible = !newstate[event.target.className].statsVisible
    this.setState({
      results: newstate
    })
  }
  componentDidMount() {
    axios.get('/api/movies')
    .then(res => {
      const serverMovies = res.data
      console.log('SERVER DATA: ', serverMovies)
      this.setState({
        results: serverMovies,
        data: serverMovies
      })
    })
  }
  render() {
    return (
      <div>
        <h1>MovieList</h1>
        <form>
          <input type="text" name="add" value={this.state.title} onChange={this.handleChange} placeholder="Add movie title here"/>
          <button onClick={this.handleAdd}>Add</button>
          </form>

          <p></p>
          <form>

          <div className="watch inline" onClick={this.handleToWatch}>All Movies</div><div id="watchedTab" className="watch inline" onClick={this.handleWatched}>Watched</div>

          <div id="toWatchTab" className="inline search">
          <input type="text" name="search" value={this.state.search} onChange={this.handleChange} placeholder="Search..."/>
          <button onClick={this.handleSubmit}>Go!</button>
          </div>
        </form>

        {this.state.results.map((movie, index) =>
          <MovieItem key={index} movie={movie} lookup={index} handleToggle={this.handleToggle} handleStats={this.handleStats}/>
        )}
      </div>
    );
  }
}

export default App;