import { useEffect } from 'react';

import BookingList from '../components/Bookings/BookingList';
import LoadingSpinner from '../components/UI/Spinner/LoadingSpinner';
import NoBookingsFound from '../components/Bookings/NoBookingsFound';
import useHttp from '../hooks/use-http';
import { getAllBookings } from '../lib/api';

const AllBookings = (props) => {
  
  const { sendRequest: sendRequestBookings, status, data: loadedBookings, error } = useHttp(getAllBookings, true);
  
  useEffect(() => {
    sendRequestBookings();    
  }, [sendRequestBookings]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (!status || (status === 'completed' && (!loadedBookings || loadedBookings.length === 0))) {
    return <NoBookingsFound />;
  }

  props.onFetchBookings(loadedBookings);

  return <BookingList bookings={loadedBookings} />;
};

export default AllBookings;
