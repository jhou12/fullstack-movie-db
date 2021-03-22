import React from 'react';
import Stats from './Stats.jsx';

class MovieItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const watched = this.props.movie.watched
      return (
        <div className="titlestats">
        <div id="movie">
          {this.props.movie.title}
          <div id="" onClick={()=> this.props.handleStatsToggle(this.props.movie.id, this.props.movie.statsVisible)}>+ (view details)</div>

          {watched ? <button id="watched" onClick={() => this.props.handleWatchedToggle(this.props.movie.id, watched)}>WATCHED</button> : <button id="notwatched" onClick={() => this.props.handleWatchedToggle(this.props.movie.id, watched)}>NOT WATCHED</button>}
        </div>
        <Stats id={this.props.movie.id} stats={this.props.movie.stats} visible={this.props.movie.statsVisible} watched={this.props.movie.watched} handleWatchedToggle={this.props.handleWatchedToggle} lookup={this.props.lookup} handleDelete={this.props.handleDelete}/>
        </div>
      )
  }
}

export default MovieItem;