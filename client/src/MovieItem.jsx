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
          <div id="" className={this.props.lookup} onClick={(e)=> this.props.handleStatsToggle(e, this.props.movie.statsVisible)}>+ (view details)</div>

          {watched ? <button id="watched" className={this.props.lookup} onClick={(e) => this.props.handleWatchedToggle(e, watched)}>WATCHED</button> : <button id="notwatched" className={this.props.lookup} onClick={(e) => this.props.handleWatchedToggle(e, watched)}>NOT WATCHED</button>}
        </div>
        <Stats stats={this.props.movie.stats} visible={this.props.movie.statsVisible} watched={this.props.movie.watched} handleWatchedToggle={this.props.handleWatchedToggle} lookup={this.props.lookup}/>
        </div>
      )
  }
}

export default MovieItem;