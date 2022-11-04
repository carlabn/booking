import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AddBooking from '../components/Bookings/AddBooking';
import LoadingSpinner from '../components/UI/Spinner/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { addBooking, getAllPlaces } from '../lib/api';

const NewBooking = () => {
  
  //const { sendRequest, status } = useHttp(addBooking);
  const history = useHistory();
  const { sendRequest: sendRequestPlaces, status, data: loadedPlaces, error } = useHttp(getAllPlaces, true);
  const { sendRequest: sendRequestAddBooking, statusAdd } = useHttp(addBooking, true);
  
  const addBookingHandler = (bookingData) => {
    sendRequestAddBooking(bookingData);
  };
  
  useEffect(() => {
    if (statusAdd === 'completed') {
      history.push('/bookings');
    }
    sendRequestPlaces();    
  }, [sendRequestPlaces, statusAdd, history]);

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

  if (!status || (status === 'completed' && (!loadedPlaces || loadedPlaces.length === 0))) {
    return <p>No Places Found</p>;
  }
 
  return <AddBooking isLoading={status === 'pending'} onAddBooking={addBookingHandler} places={loadedPlaces}/>;
};

export default NewBooking;
