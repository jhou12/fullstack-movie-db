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
              <br/><b>imdbRating:</b> {this.props.stats.imdbRating}
              <br/><b>Watched:</b> {this.props.watched ? <div id="green" className={this.props.lookup} onClick={(e) => this.props.handleToggle(e)} ></div> : <div id="gray" className={this.props.lookup} onClick={(e) => this.props.handleToggle(e)}></div>}
          </div>
        )
      } else {
      return null
    }
  }
}

export default Stats;