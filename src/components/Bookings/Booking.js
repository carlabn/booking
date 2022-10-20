import React from 'react';

import classes from './Booking.module.css';

const Booking = (props) => {
  return (
    <li className={classes.booking}>
      <h2>{props.place} ({props.location})</h2>
      <h3>{props.startDate} - {props.endDate}</h3>
      <p>{props.quantity} {props.quantity>1 ? 'people' : 'person'}</p>
      <p>{props.price} £</p>
    </li>
  );
};

export default Booking;
