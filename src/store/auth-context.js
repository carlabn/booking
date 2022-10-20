import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  isAdmin: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    const storedUserIsAdminInformation = localStorage.getItem('isAdmin');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
    if (storedUserIsAdminInformation === '1') {
      setIsAdmin(true);
    }

  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    setIsLoggedIn(false);    
  };

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    if('admin@admin.com' === email) {
      localStorage.setItem('isAdmin', '1');
      setIsAdmin(true);
    }
    setIsLoggedIn(true);    
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;