import React from 'react';

class Stats extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.visible) {
        return (
          <div id="stats">
              <b>Year:</b> {this.props.stats.Year}
              <br/><b>Runtime</b>: {this.props.stats.Runtime} min
              <br/><b>Metascore:</b> {this.props.stats.Metascore}
              <br/><b>imdbRating:</b> {this.props.stats.imdbRating}/10
              <br/>
          <div id="watchedCircleLine">
              <b>Watched:</b> {this.props.watched ? <div id="watchedGreenCircle" onClick={() => this.props.handleWatchedToggle(this.props.id, this.props.watched)} ></div> : <div id="watchedGrayCircle" onClick={() => this.props.handleWatchedToggle(this.props.id, this.props.watched)}></div>}
          </div>
              <br/><button id="deleteButton" onClick={() => this.props.handleDelete(this.props.id)}>DELETE ENTRY</button>
          </div>
        )
      } else {
      return null
    }
  }
}

export default Stats;