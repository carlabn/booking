import React from 'react';

import Booking from './Booking';
import classes from './BookingList.module.css';

const BookingList = (props) => {
  return (
    <ul className={classes['booking-list']}>
      {props.bookings.map((booking) => (
        <Booking
          key={booking.id}
          location={booking.location}
          place={booking.place}
          startDate={booking.startDate}
          endDate={booking.endDate}
          quantity={booking.quantity}
          price={booking.price}
        />
      ))}
    </ul>
  );
};

export default BookingList;
