import React, { useContext, useState } from 'react';

import BookingHome from './components/Bookings/BookingHome';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {

  const [mode, setMode] = useState('booking');
  const ctx = useContext(AuthContext);

  const modeHandler = (mode) => {
    setMode(mode);
  }

  return (
    <React.Fragment>
      <MainHeader onClick={modeHandler} />
      <main>
        {!ctx.isLoggedIn && <Login />}  
        {ctx.isLoggedIn && mode === 'booking' && <BookingHome />}
        {ctx.isLoggedIn && mode === 'place' && <Home />}              
      </main>
    </React.Fragment>
  );
}

export default App;