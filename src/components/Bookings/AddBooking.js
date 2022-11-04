import React, { useRef, useState, useEffect } from 'react';

import classes from './AddBooking.module.css';
import ErrorModal from '../UI/Error/ErrorModal';
import Wrapper from '../Helpers/Wrapper';
import LoadingSpinner from '../../components/UI/Spinner/LoadingSpinner';
import Card from '../UI/Card/Card';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm +'/'+ dd +'/'+ yyyy;

function AddBooking(props) {

  const [error, setError] = useState();
  const [nights, setNights] = useState(1);
  const [roomsAvailable, setRoomsAvailable] = useState(0);
  const [locations, setLocations] = useState([]);
  const [places, setPlaces] = useState(props.places);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  
  const locationRef = useRef('');
  const placeRef = useRef('');
  const startDateRef = useRef('');
  const endDateRef = useRef('');
  const quantityRef = useRef(1);
  const totalPriceRef = useRef(0);
  const priceRef = useRef(0);
  
    
  useEffect(() => {
    
    const loadedLocations = [];
    const loadedPlaces = [];
    const data = places;

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

        const found = loadedLocations.some(el => el.name === data[key].location);
        if (!found) {
          loadedLocations.push({
            id: key,
            name: data[key].location,
          });
        }        
    }

    setPlaces(loadedPlaces);
    setLocations(loadedLocations);      

  }, []);

    
  function submitHandler(event) {
    event.preventDefault();

    const enteredLocation = locationRef.current.value;
    const enteredPlace = placeRef.current.value;
    const enteredPeople = quantityRef.current.value;
    const enteredStartDate = startDateRef.current.value;
    const enteredEndDate = endDateRef.current.value;
    const enteredTotalPrice = totalPriceRef.current.value; 

    if (enteredPlace.trim().length === 0 || enteredPeople.trim() < 1) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid destination and number of persons (non-empty values).',
      });
      return;
    }

    if(enteredStartDate.trim().length === 0 || enteredEndDate.trim().length === 0 || enteredEndDate <= enteredStartDate || enteredStartDate < today) {
      setError({
            title: 'Invalid dates',
            message: 'Please enter a valid range of dates.',
      });
      return;
    }
    
    if(enteredPeople > roomsAvailable) {
      setError({
        title: 'No rooms available.',
        message: 'No rooms for this dates. Please select another place.',
      });
      return;
    }

    const booking = {
      location: enteredLocation,
      place: enteredPlace,
      startDate: enteredStartDate,
      endDate: enteredEndDate,
      quantity: enteredPeople,
      price: enteredTotalPrice
    };

    props.onAddBooking(booking);
    locationRef.current.value = '';
    placeRef.current.value = '';
    quantityRef.current.value = '';
    startDateRef.current.value = '';
    endDateRef.current.value = '';
    totalPriceRef.current.value  = '';
    priceRef.current.value = '';
    setRoomsAvailable(0);
  }

  const errorHandler = () => {
    setError(null);
  };

  const placeHandler = (event) => {
    const findPlace =props.places.filter( (element) => {
      return element.name === event.target.value;
    });
    if(findPlace.length > 0) {
      setRoomsAvailable(findPlace[0].sitesAvailable);
      priceRef.current.value = findPlace[0].price;
      totalPriceRef.current.value  = (findPlace[0].price * nights * quantityRef.current.value);
    }    
  }

  const peopleHandler = (event) => {
    if(event.target.value > 0) {
      totalPriceRef.current.value  = (priceRef.current.value * nights * quantityRef.current.value);      
    }
  }

  const startDateHandler = (event) => {
       
    if(event.target.value && endDateRef.current.value) {
      let date1 = new Date(event.target.value);
      let date2 = new Date(endDateRef.current.value);

      calculateDays(date1, date2);        
    }
  }

  const endDateHandler = (event) => {
    
    if(startDateRef.current.value && event.target.value) {

      let date1 = new Date(startDateRef.current.value);
      let date2 = new Date(event.target.value);

      calculateDays(date1, date2);      
    }
  }

  const calculateDays = (date1, date2) => {
    // To calculate the time difference of two dates
    let Difference_In_Time = date2.getTime() - date1.getTime();
  
    // To calculate the no. of days between two dates
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    if(Difference_In_Days > 0) {
      setNights(Difference_In_Days);
      totalPriceRef.current.value  = (priceRef.current.value * Difference_In_Days * quantityRef.current.value);  
    }
  }
  
  const filterPlaces = (event) => {
    const filteredPlaces = places.filter( (element) => {
      return element.location === event.target.value
    });
    setFilteredPlaces(filteredPlaces);
  }


  return (
    <Wrapper>
      {error && (
            <ErrorModal
              title={error.title}
              message={error.message}
              onConfirm={errorHandler}
            />
      )}      
      <Card>
        <form onSubmit={submitHandler} className={classes.form}>
          {props.isLoading && (
              <div className={classes.loading}>
                <LoadingSpinner />
              </div>
          )}
            <div className={classes.control}>
              <label htmlFor='location'>Where are you going?</label>
              <select id='location' ref={locationRef} onChange={filterPlaces} defaultValue='0'>
                <option key='0' value='0'>Choose a Location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.name} >
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.control}>
              <label htmlFor='place'>Places</label>
              <select id='place' ref={placeRef} onChange={placeHandler} defaultValue='0'>
                <option key='0' value='0'>Choose a Place</option>
                {filteredPlaces.map((place) => (
                    <option key={place.id} value={place.name} >
                      {place.name}
                    </option>
                ))}
              </select>
            </div>
            <div className={classes.control}>
              <label htmlFor='start-date'>Check In</label>
              <input type='date' id='start-date' ref={startDateRef} onChange={startDateHandler}/>
            </div>
            <div className={classes.control}>
              <label htmlFor='end-date'>Check Out</label>
              <input type='date' id='end-date' ref={endDateRef} onChange={endDateHandler}/>
            </div>
            <div className={classes.control}>
              <label htmlFor='price'>Price/Night</label>
              <input type='number' id='price' ref={priceRef} readOnly/>
            </div>
            <div className={classes.control}>
              <label htmlFor='quantity'>How many people?</label>
              <input type='number' id='quantity' ref={quantityRef} onChange={peopleHandler} defaultValue='1' min='1' max='10' step='1'/>
            </div>          
            <div className={classes.control}>
              <label htmlFor='totalPrice'>Total Price</label>
              <input type='number' id='totalPrice' ref={totalPriceRef} readOnly/>
            </div>
            <div className={classes.actions}>
              <button className='btn'>Add Booking</button>
            </div>
        </form>    
      </Card>  
    </Wrapper>
  );
}

export default AddBooking;