import React, { useState, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/Spinner/LoadingSpinner';
import AuthContext from './store/auth-context';
import { useContext } from 'react'; 

//only loaded when it's needed
const NewBooking = React.lazy(() => import('./pages/NewBooking'));
const EditBooking = React.lazy(() => import('./pages/EditBooking'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const AllPlaces = React.lazy(() => import('./pages/AllPlaces'));
const Logout = React.lazy(() => import('./pages/Logout'));
const Login = React.lazy(() => import('./components/Login/Login'));
const NewPlace = React.lazy(() => import('./pages/NewPlace'));
const EditPlace = React.lazy(() => import('./pages/EditPlace'));

//if we land here it does not have much sense
const AllBookings = React.lazy(() => import('./pages/AllBookings'));

function App() {
 
  const [bookings, setBookings] = useState([]); 
  
  const ctx = useContext(AuthContext);

  const bookingsHandler = (loadedBookings) => {
    setBookings(loadedBookings);    
  }

  return (
    <Layout>
      <Suspense fallback={
          <div className='centered'>
            <LoadingSpinner/>
          </div>
        }>
        <Switch>
          <Route path='/' exact>
            {ctx.isLoggedIn && <Redirect to='/bookings' />}
            {!ctx.isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route path='/bookings' exact>
            <AllBookings onFetchBookings={bookingsHandler}/>
          </Route>
          <Route path='/places' exact>
            <AllPlaces />
          </Route>
          <Route path='/places/:placeId'>
            <EditPlace />
          </Route>
          <Route path='/new-place' exact>
            <NewPlace />
          </Route>
          <Route path='/bookings/:bookingId'>
            <EditBooking />
          </Route>
          <Route path='/new-booking'>
            <NewBooking />
          </Route>
          <Route path='/logout'>
            <Logout />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>     
    </Layout>
  );
}

export default App;