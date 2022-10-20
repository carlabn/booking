import React from 'react';

import Place from './Place';
import classes from './PlaceList.module.css';

const PlaceList = (props) => {
  return (
    <ul className={classes['place-list']}>
      {props.places.map((place) => (
        <Place
          key={place.id}
          location={place.location}
          name={place.name}
          description={place.description}
          price={place.price}
          sitesAvailable={place.sitesAvailable}
        />
      ))}
    </ul>
  );
};

export default PlaceList;