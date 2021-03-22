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
              <br/><b>Watched:</b> {this.props.watched ? <div id="green" onClick={() => this.props.handleWatchedToggle(this.props.id, this.props.watched)} ></div> : <div id="gray" onClick={() => this.props.handleWatchedToggle(this.props.id, this.props.watched)}></div>}
              <br/><div className="delete" onClick={() => this.props.handleDelete(this.props.id)}>DELETE ENTRY</div>
          </div>
        )
      } else {
      return null
    }
  }
}

export default Stats;