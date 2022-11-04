import { Fragment, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import EditBooking from '../components/Bookings/EditBooking';
//import Comments from '../components/comments/Comments';
import useHttp from '../hooks/use-http';
import { getSingleBooking, editBooking } from '../lib/api';
import LoadingSpinner from '../components/UI/Spinner/LoadingSpinner';

const BookingDetail = () => {
  
  const params = useParams();
  const { bookingId } = params;
  const history = useHistory();

  const { sendRequest, status, data: loadedBooking, error } = useHttp(getSingleBooking, true);
  const { sendRequest: sendRequestModify, status: statusModify } = useHttp(editBooking, true);

  useEffect(() => {
    if(statusModify === 'completed'){
      history.push('/bookings');
    }
    sendRequest(bookingId);
  }, [sendRequest, bookingId, history, statusModify]);
  
  const editBookingHandler = (bookingData) => {
    sendRequestModify(bookingData);
  }

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered'>{error}</p>;
  }

  if (!loadedBooking.price) {
    return <p>No Booking found!</p>;
  }

  return (
    <Fragment>
      <EditBooking details={loadedBooking} onEditBooking={editBookingHandler}/>
    </Fragment>
  );
};

export default BookingDetail;
