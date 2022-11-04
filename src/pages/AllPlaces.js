import { useEffect } from 'react';

import PlaceList from '../components/Places/PlaceList';
import LoadingSpinner from '../components/UI/Spinner/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getAllPlaces } from '../lib/api';

const AllPlaces = (props) => {
  
  const { sendRequest: sendRequestPlaces, status, data: loadedPlaces, error } = useHttp(getAllPlaces, true);
  
  useEffect(() => {
    sendRequestPlaces();    
  }, [sendRequestPlaces]);

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
    return <p>No Places found</p>;
  }

  return <PlaceList places={loadedPlaces} />;
};

export default AllPlaces;
