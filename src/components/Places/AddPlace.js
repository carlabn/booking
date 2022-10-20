import React, { useRef, useState } from "react";
import classes from './AddPlace.module.css';
import ErrorModal from '../UI/Error/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

const places = ['Abeerden', 'Aviemore', 'Dundee', 'Edinburgh', 'Glasgow', 'Inverness', 'Fort William', 'Largs', 'Perth', 'Stirling', 'St. Andrews'];

function AddPlace(props) {
    
    const [error, setError] = useState();

    const locationRef = useRef('');
    const nameRef = useRef('');
    const descriptionRef = useRef('');
    const priceNightRef = useRef(0);
    const sitesAvailableRef = useRef(0);
  
    function submitHandler(event) {
      event.preventDefault();

      const enteredPlace = nameRef.current.value;
      const enteredPrice = priceNightRef.current.value;
      const enteredDescription = descriptionRef.current.value;
      const enteredSitesAvailable = sitesAvailableRef.current.value;
  
      if (enteredPlace.trim().length === 0 || enteredPrice.trim() < 0 || enteredDescription.trim().length === 0 || enteredSitesAvailable < 0) {
        setError({
          title: 'Invalid input',
          message: 'Please enter a valid name, description, and price (non-empty values).',
        });
        return;
      }
  
      const place = {
        location: locationRef.current.value,
        name: enteredPlace,
        description: enteredDescription,
        price: enteredPrice,
        sitesAvailable: enteredSitesAvailable
      };
  
      props.onAddPlace(place);
      nameRef.current.value = '';
      descriptionRef.current.value = '';
      priceNightRef.current.value = 0;
      sitesAvailableRef.current.value = 0;
    }

    const errorHandler = () => {
      setError(null);
    };
  
    return (
      <Wrapper>
        {error && (
              <ErrorModal
                title={error.title}
                message={error.message}
                onConfirm={errorHandler}
              />
        )}
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor='location'>Location</label>
              <select id='location' ref={locationRef}>
                {places.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.control}>
              <label htmlFor='name'>Name</label>
              <input type='text' id='name' ref={nameRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='description'>Description</label>
              <textarea rows='5' id='description' ref={descriptionRef}></textarea>
            </div>
            <div className={classes.control}>
              <label htmlFor='price'>Price per Night</label>
              <input type='number' id='price' ref={priceNightRef}/>
            </div>
            <div className={classes.control}>
              <label htmlFor='sites-availables'>Sites Availables</label>
              <input type='number' id='sites-availables' ref={sitesAvailableRef} defaultValue='0' min='0' step='1'/>
            </div>
            <button>Add Place</button>
        </form>         
      </Wrapper>
    );
  }
  
  export default AddPlace;