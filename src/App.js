import React, { useEffect } from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store';
import { setCurrentUser } from './actions/authActions';
import RootContainer from './RootContainer';

const App = () => {
  useEffect(() => {
    let user = localStorage.getItem('user');
    const token = localStorage.getItem('jwtToken');
    if (user !== 'undefined') {
      user = JSON.parse(user);
      store.dispatch(setCurrentUser({ user, token }));
    }
  }, []);

  axios.defaults.baseURL = 'https://banka-api.herokuapp.com/';

  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
};

export default App;
