import React, {Fragment} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Place from './Place';
import classes from './PlaceList.module.css';

const sortPlaces = (places, ascending) => {
  return places.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.name > quoteB.name ? 1 : -1;
    } else {
      return quoteA.name < quoteB.name ? 1 : -1;
    }
  });
};

const PlaceList = (props) => {

  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('sort') === 'asc';

  const sortedPlaces = sortPlaces(props.places, isSortingAscending);

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
          Sort {isSortingAscending ? 'Asc' : 'Desc'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedPlaces.map((place) => (
          <Place
            key={place.id}
            id={place.id}
            location={place.location}
            name={place.name}
            description={place.description}
            price={place.price}
            sitesAvailable={place.sitesAvailable}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default PlaceList;