import { Fragment, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import EditPlace from '../components/Places/EditPlace';
//import Comments from '../components/comments/Comments';
import useHttp from '../hooks/use-http';
import { getSinglePlace, editPlace } from '../lib/api';
import LoadingSpinner from '../components/UI/Spinner/LoadingSpinner';

const PlaceDetail = () => {
  
  const params = useParams();
  const history = useHistory();

  const { placeId } = params;

  const { sendRequest: sendRequestSingle, status, data: loadedPlace, error } = useHttp(getSinglePlace, true);
  const { sendRequest: sendRequestModify, status: statusModify } = useHttp(editPlace, true);

  useEffect(() => {
    if (statusModify === 'completed') {
      history.push('/places');
    }
    sendRequestSingle(placeId);
  }, [sendRequestSingle, placeId, statusModify, history]);

  const modifyPlaceHandler = (placeData) => {
    sendRequestModify(placeData);
  };

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

  if (!loadedPlace.price) {
    return <p>No Place found!</p>;
  }

  return (
    <Fragment>
      <EditPlace details={loadedPlace} onModifyPlace={modifyPlaceHandler}/>
    </Fragment>
  );
};

export default PlaceDetail;