import { Link } from 'react-router-dom';

import classes from './NoBookingsFound.module.css';

const NoBookingsFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>No Bookings found!</p>
      <Link className='btn' to='/new-booking'>
        Book a Golf Break!!!
      </Link>
    </div>
  );
};

export default NoBookingsFound;