import React, { Component, useEffect } from 'react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import './App.css';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import RootContainer from './RootContainer';



// // Check for token
// if (localStorage.getItem('jwtToken') !== 'undefined') {
//   const user = localStorage.getItem('user');
//   // Set auth token header auth
//   setAuthToken(localStorage.jwtToken);
//   // Decode token and get user info and exp
//   const decoded = jwt_decode(localStorage.jwtToken);
//   // Set user and isAuthenticated
//   console.log('rid', user.firstName);
//   store.dispatch(setCurrentUser(user));

//   // Check for expired token
//   const currentTime = Date.now() / 1000;
//   // if (decoded.exp < currentTime) {
//   //   // Logout user
//   //   store.dispatch(logoutUser());
//   //   // Redirect to login
//   //   window.location.href = '/login';
//   // }
// }

const App = () => {
  useEffect( () => {
      let user = localStorage.getItem('user');
      const token = localStorage.getItem('jwtToken')
      if(user !== 'undefined') {
        user = JSON.parse(user);
        store.dispatch(setCurrentUser({user, token}))    
      }
  }, [])

  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
};

export default App;
