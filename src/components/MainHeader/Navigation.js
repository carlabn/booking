import React, { useContext } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  const ctx = useContext(AuthContext);  

  let content = '';    

  if(ctx.isLoggedIn) {    
    content = 
      <ul>
        <li><button onClick={() => props.onClick('booking')}>My Bookings</button></li>
        {ctx.isAdmin && <li><button onClick={() => props.onClick('place')}>My Places</button></li>}
        <li><button onClick={ctx.onLogout}>Logout</button></li>;
      </ul>;
  }
  else {
    content =
      <ul>
        <li><button onClick={() => props.onClick('login')}>Login</button></li>;
      </ul>
  }

  return (
    <nav className={classes.nav}>
      {content}
    </nav>
  );
};

export default Navigation;
