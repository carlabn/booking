import React, { useEffect, useState } from 'react';

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

const EditBooking = (props) => {

  const id = props.details.id;
  const [error, setError] = useState();
  const [startDate, setStartDate] = useState(props.details.startDate);
  const [endDate, setEndDate] = useState(props.details.endDate);
  const [totalPrice, setTotalPrice] = useState(props.details.price);
  const [people, setPeople] = useState(props.details.quantity);
  const [nights, setNights] = useState(0); 
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let Difference_In_Time = (new Date(endDate).getTime()) - (new Date (startDate).getTime());
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log('nights ' + Difference_In_Days);
    if(Difference_In_Days > 0) {
      setNights(Difference_In_Days);
    }
    setPrice(totalPrice/Difference_In_Days);
  }, []);

  const calculateDays = (date1, date2) => {
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    
    if(Difference_In_Days > 0) {
      setNights(Difference_In_Days);
      setTotalPrice(price * Difference_In_Days * people);  
    }
  }
 
  function submitHandler(event) {
    event.preventDefault();

    if (people.trim() < 1) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid number of people (non-empty values).',
      });
      return;
    }

    if(startDate.trim().length === 0 || endDate.trim().length === 0 || endDate <= startDate || startDate < today) {
      setError({
            title: 'Invalid dates',
            message: 'Please enter a valid range of dates.',
      });
      return;
    }
    
    const booking = {
      id,
      location: props.details.location,
      place: props.details.place,
      startDate,
      endDate,
      quantity: people,
      price: totalPrice
    };

    props.onEditBooking(booking);
  }

  const errorHandler = () => {
    setError(null);
  };  

  const peopleHandler = (event) => {
    if(event.target.value > 0) {
      setTotalPrice(price * nights * event.target.value);      
    }
    setPeople(event.target.value);
  }

  const startDateHandler = (event) => {
       
    if(event.target.value && endDate) {
      let date1 = new Date(event.target.value);
      let date2 = new Date(endDate);

      calculateDays(date1, date2);        
    }

    setStartDate(event.target.value);
  }

  const endDateHandler = (event) => {
    
    if(startDate && event.target.value) {

      let date1 = new Date(startDate);
      let date2 = new Date(event.target.value);

      calculateDays(date1, date2);      
    }

    setEndDate(event.target.value);
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
              <input type='text' id='location' value={props.details.location}/>
            </div>
            <div className={classes.control}>
              <label htmlFor='place'>Places</label>
              <input type='text' id='place' value={props.details.place}/>
            </div>
            <div className={classes.control}>
              <label htmlFor='start-date'>Check In</label>
              <input type='date' id='start-date' value={startDate} onChange={startDateHandler}/>
            </div>
            <div className={classes.control}>
              <label htmlFor='end-date'>Check Out</label>
              <input type='date' id='end-date' value={endDate} onChange={endDateHandler}/>
            </div>
            <div className={classes.control}>
              <label htmlFor='price'>Price/Night</label>
              <input type='number' id='price' value={price} readOnly/>
            </div>
            <div className={classes.control}>
              <label htmlFor='quantity'>How many people?</label>
              <input type='number' id='quantity' value={people} onChange={peopleHandler} min='1' max='10' step='1'/>
            </div>          
            <div className={classes.control}>
              <label htmlFor='totalPrice'>Total Price</label>
              <input type='number' id='totalPrice' value={totalPrice} readOnly/>
            </div>
            <div className={classes.actions}>
              <button className='btn'>Update Booking</button>
            </div>
        </form>    
      </Card>  
    </Wrapper>
  );
};

export default EditBooking;