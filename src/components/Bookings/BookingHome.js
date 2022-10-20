import React, { useState, useEffect, useCallback, useContext } from 'react';

import BookingList from './BookingList';
import AddBooking from './AddBooking';
import './BookingHome.module.css';
import AuthContext from '../../store/auth-context';

const BookingHome = () => {
  
  const ctx = useContext(AuthContext);
  
  const [bookings, setBookings] = useState([]);
  const [locations, setLocations] = useState([]);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlacesHandler = useCallback(async () => {
    try {
      const response = await fetch('https://react-http-4ee20-default-rtdb.firebaseio.com/places.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedPlaces = [];
      const loadedLocations = [];

      for (const key in data) {
        if(data[key].sitesAvailable > 0) {
          loadedPlaces.push({
            id: key,
            location: data[key].location,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
            sitesAvailable: data[key].sitesAvailable
          });
        }

        const index = loadedLocations.filter( (element) => {
          return element.name === data[key].location
        });

        if(index.length === 0) {
          loadedLocations.push({
            id: key,
            name: data[key].location,
          });
        }
      }

      setPlaces(loadedPlaces);
      setLocations(loadedLocations);
    }
    catch (error) {
      setError(error.message);
    }
  }, []);

  const fetchBookingHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-4ee20-default-rtdb.firebaseio.com/bookings.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedBookings = [];

      for (const key in data) {
        loadedBookings.push({
          id: key,
          location: data[key].location,
          place: data[key].place,
          startDate: data[key].startDate,
          endDate: data[key].endDate,
          quantity: data[key].quantity,
          price: data[key].price
        });
      }

      setBookings(loadedBookings);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBookingHandler();
    fetchPlacesHandler();
  }, [fetchBookingHandler, fetchPlacesHandler]);

  async function addBookingHandler(booking) {
    //Add Booking
    const response = await fetch('https://react-http-4ee20-default-rtdb.firebaseio.com/bookings.json', {
      method: 'POST',
      body: JSON.stringify(booking),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);

    //Update rooms available on the selected place...
  }

  const filterPlaces = (location) => {
    const filteredPlaces = places.filter( (element) => {
      return element.location === location
    });
    setFilteredPlaces(filteredPlaces);
  }

  let content = <p>Found no bookings.</p>;

  if (bookings.length > 0) {
    content = <BookingList bookings={bookings} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      {!ctx.isAdmin && <section>
        <AddBooking onAddBooking={addBookingHandler} onFilter={filterPlaces} places={filteredPlaces} locations={locations}/>
      </section>}
      <section>
        <button onClick={fetchBookingHandler}>Fetch Bookings</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default BookingHome;