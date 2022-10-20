import React from 'react';

import classes from './Place.module.css';

const Place = (props) => {
  return (
    <li className={classes.place}>
      <h2>{props.location}</h2>
      <h3>{props.name} ({props.price}£/Night )</h3>
      <p>{props.description}</p>
      <p>{props.sitesAvailable} rooms available</p>
    </li>
  );
};

export default Place;