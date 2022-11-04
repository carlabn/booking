import React, {Fragment} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Booking from './Booking';
import classes from './BookingList.module.css';

const sortBookings = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.startDate > quoteB.startDate ? 1 : -1;
    } else {
      return quoteA.startDate < quoteB.startDate ? 1 : -1;
    }
  });
};

const BookingList = (props) => {

  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('sort') === 'asc';

  const sortedBookings = sortBookings(props.bookings, isSortingAscending);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
    });
  };


  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Farthest' : 'Latest'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedBookings.map((booking) => (
          <Booking
            key={booking.id}
            id={booking.id}
            location={booking.location}
            place={booking.place}
            startDate={booking.startDate}
            endDate={booking.endDate}
            quantity={booking.quantity}
            price={booking.price}
          />
        ))}
    </ul>
    </Fragment>
  );
};

export default BookingList;
