import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react'; 

const MainNavigation = () => {

  const ctx = useContext(AuthContext);
  
  let content = '';

  if(ctx.isLoggedIn) { 
    content = (
        <ul>
            <li>
              <NavLink to='/bookings' activeClassName={classes.active}>
                All Bookings
              </NavLink>
            </li>
            {ctx.isAdmin &&
              <li>
                <NavLink to='/places' activeClassName={classes.active}>
                  All Places
                </NavLink>
              </li>
            }
            {ctx.isAdmin &&
              <li>
                <NavLink to='/new-place' activeClassName={classes.active}>
                  Add Place
                </NavLink>
              </li>
            }
            {!ctx.isAdmin &&
            <li>
              <NavLink to='/new-booking' activeClassName={classes.active}>
                Book a GolfBreak!!!
              </NavLink>
            </li>
            }
            <li>
              <NavLink to='/logout' activeClassName={classes.active}>
                Logout
              </NavLink>
            </li>
          </ul>  
    );
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Bookings</div>
      <nav className={classes.nav}>
        {content}
      </nav>
    </header>
  );
};

export default MainNavigation;
