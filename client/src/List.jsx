import React from 'react';
import ListItem from './ListItem.jsx'

const List = (props) => {
  return (
    <div>
      {props.testState.map(entry => <ListItem entry={entry}/>)}
    </div>
  )
}

export default List;