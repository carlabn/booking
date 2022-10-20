import React, { useState, useEffect } from 'react';

import AddPlace from '../Places/AddPlace';
import PlaceList from '../Places/PlaceList';
import useHttp from '../../hooks/use-http';

const Home = (props) => {
  
  const [places, setPlaces] = useState([]);
 
  const {isLoading, error, sendRequest: fetchPlaces} = useHttp();
  const {isLoadingAdding, errorAdding, sendRequest: addPlace} = useHttp();

  useEffect(() => {
    fetchPlaces({ url: 'https://react-http-4ee20-default-rtdb.firebaseio.com/places.json'}, transformPlaces);
  }, [fetchPlaces]);

  const transformPlaces = (placesObj) => {
    const loadedPlaces = [];

    for (const key in placesObj) {
        loadedPlaces.push({
          id: key,
          location: placesObj[key].location,
          name: placesObj[key].name,
          description: placesObj[key].description,
          price: placesObj[key].price,
          sitesAvailable: placesObj[key].sitesAvailable
        });
    }
    setPlaces(loadedPlaces);
  }

  const fetchAllPlaces = () => {
    fetchPlaces({ url: 'https://react-http-4ee20-default-rtdb.firebaseio.com/places.json'}, transformPlaces);
  }

  const addPlaceHandler = (place) => { 

     addPlace({
        url: 'https://react-http-4ee20-default-rtdb.firebaseio.com/places.json',
        method: 'POST',
        body: place,
        headers: {
          'Content-Type': 'application/json'
        }
      }, doNothing);     
  }

  const doNothing = () => {}    

  let content = <p>Found no places.</p>;

  if (places.length > 0) {
    content = <PlaceList places={places} />;
  }

  if (error || errorAdding) {
    content = <p>{error}</p>;
  }

  if (isLoading || isLoadingAdding) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
    <section>
      <AddPlace onAddPlace={addPlaceHandler} />
    </section>
    <section>
      <button onClick={fetchAllPlaces}>Fetch Places</button>
    </section>
    <section>{content}</section>
  </React.Fragment>
  );
};

export default Home;
