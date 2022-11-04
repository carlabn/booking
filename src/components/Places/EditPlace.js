import React, { useState } from "react";
import classes from './AddPlace.module.css';
import ErrorModal from '../UI/Error/ErrorModal';
import Wrapper from '../Helpers/Wrapper';
import Card from '../UI/Card/Card';

const EditPlace = (props) => {
    
    const [error, setError] = useState();
    const [id, setId] = useState(props.details.id);
    const [name, setName] = useState(props.details.name);
    const [description, setDescription] = useState(props.details.description);
    const [price, setPrice] = useState(props.details.price);
    const [sitesAvailable, setSitesAvailable] = useState(props.details.sitesAvailable);

    function submitHandler(event) {
        event.preventDefault();
  
        const enteredPlace = name;
        const enteredPrice = price;
        const enteredDescription = description;
        const enteredSitesAvailable = sitesAvailable;
    
        if (enteredPlace.trim().length === 0 || enteredPrice.trim() < 0 || enteredDescription.trim().length === 0 || enteredSitesAvailable < 0) {
          setError({
            title: 'Invalid input',
            message: 'Please enter a valid name, description, and price (non-empty values).',
          });
          return;
        }
    
        const place = {    
          id: id,      
          location: props.details.location,
          name: enteredPlace,
          description: enteredDescription,
          price: enteredPrice,
          sitesAvailable: enteredSitesAvailable
        };
    
        props.onModifyPlace(place);
        setId('');
        setName('');
        setDescription('');
        setPrice(0);
        setSitesAvailable(0);
      }

    const errorHandler = () => {
        setError(null);
    };

    const onNameHandler = ((e) => {
        setName(e.target.value);
    });

    const onPriceHandler = ((e) => {
        setPrice(e.target.value);
    });

    const onDescriptionHandler = ((e) => {
        setDescription(e.target.value);
    });

    const onSitesHandler = ((e) => {
        setSitesAvailable(e.target.value);
    });

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
          <form onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor='location'>Location</label>
                <input type='text' id='location' value={props.details.location} readonly/>
              </div>
              <div className={classes.control}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' value={name} onChange={onNameHandler} />
              </div>
              <div className={classes.control}>
                <label htmlFor='description'>Description</label>
                <textarea rows='5' id='description' value={description} onChange={onDescriptionHandler}></textarea>
              </div>
              <div className={classes.control}>
                <label htmlFor='price'>Price per Night</label>
                <input type='number' id='price' value={price} onChange={onPriceHandler}/>
              </div>
              <div className={classes.control}>
                <label htmlFor='sites-availables'>Sites Availables</label>
                <input type='number' id='sites-availables' min='0' step='1' defaultValue={sitesAvailable} onChange={onSitesHandler}/>
              </div>
              <button>Update Place</button>
          </form>  
        </Card>      
      </Wrapper>
    );
};

export default EditPlace;