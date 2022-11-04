import { Link } from 'react-router-dom';

import classes from './Place.module.css';

const Place = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <h2>{props.location}</h2>
          <h3>{props.name} ({props.price}£/Night )</h3>
          <p>{props.description}</p>
          <p>{props.sitesAvailable} rooms available</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link className='btn' to={`/places/${props.id}`}>
        Edit Place
      </Link>
    </li>
  );
};

export default Place;