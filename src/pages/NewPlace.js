import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AddPlace from '../components/Places/AddPlace';
import LoadingSpinner from '../components/UI/Spinner/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { addPlace } from '../lib/api';

const NewPlace = () => {
  
  const history = useHistory();
  const { sendRequest: sendRequestAddPlace, status: statusAdd, errorAdd } = useHttp(addPlace, true);

  const addPlaceHandler = (placeData) => {
    sendRequestAddPlace(placeData);
  };  
  
  useEffect(() => {
    if (statusAdd === 'completed') {
      history.push('/places');
    }
  }, [statusAdd, history]);

  if (errorAdd) {
    return <p className='centered focused'>{errorAdd}</p>;
  }    

  return <AddPlace isLoading={statusAdd === 'pending'} onAddPlace={addPlaceHandler}/>;
};

export default NewPlace;
