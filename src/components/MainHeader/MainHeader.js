import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>Travel to Scotland</h1>
      <Navigation onClick={props.onClick} />
    </header>
  );
};

export default MainHeader;
