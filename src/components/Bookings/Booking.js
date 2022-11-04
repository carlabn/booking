import { Link } from 'react-router-dom';

import classes from './Booking.module.css';

const Booking = (props) => {
  
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.place} ({props.location})</p>
          <p>{props.startDate} - {props.endDate}</p>
          <p>{props.quantity} {props.quantity>1 ? 'people' : 'person'}</p>
          <p>{props.price} £</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link className='btn' to={`/bookings/${props.id}`}>
        Edit Booking
      </Link>
    </li>
  );
};

export default Booking;
