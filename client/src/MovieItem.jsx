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
        <div id="movie" className={this.props.lookup} onClick={(e)=> this.props.handleStats(e)}>
          {this.props.movie.title}
          {watched ? <button id="watched" className={this.props.lookup} onClick={(e) => this.props.handleToggle(e, watched)}>WATCHED</button> : <button id="notwatched" className={this.props.lookup} onClick={(e) => this.props.handleToggle(e, watched)}>NOT WATCHED</button>}
        </div>
        <Stats stats={this.props.movie.stats} visible={this.props.movie.statsVisible} watched={this.props.movie.watched} handleToggle={this.props.handleToggle} lookup={this.props.lookup}/>
        </div>
      )
  }
}

export default MovieItem;