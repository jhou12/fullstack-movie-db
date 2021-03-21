import React from 'react';

const ListItem = (props) => {
  return (
    <div>
      Entry {props.entry.testId}: {props.entry.testText}
    </div>
  )
}

export default ListItem;