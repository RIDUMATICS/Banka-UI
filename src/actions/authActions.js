import axios from 'axios';
import _ from 'lodash';
import { SET_CURRENT_USER, SET_ENABLE2FA, SET_LOADING } from './type';
import setAuthToken from '../utils/setAuthToken';
import { showAlert } from './alertAction';

// Register User
export const registerUser = (data, history) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
  return axios
    .post('http://localhost:4000/api/v1/auth/signup', data)
    .then((res) => {
      const { token, user } = res.data.data;
      // save token and user details to localStorage
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      // set token to Auth header
      setAuthToken(token);
      dispatch({
        type: SET_LOADING,
      });
      dispatch({
        type: SET_CURRENT_USER,
        payload: user,
      });
      return history.push('/dashboard');
    })
    .catch((err) => {
      let errorResp;
      if (_.has(err.response, 'data')) {
        const { error, status } = err.response.data;
        if (status === 500) {
          errorResp = 'This is not you, Please try again';
        } else {
          errorResp = error;
        }
      } else {
        errorResp = 'This is not you, Please try again';
      }
      console.log(err);
      dispatch({
        type: SET_LOADING,
      });
      return dispatch(
        showAlert({
          component: 'signUp',
          message: errorResp,
          type: 'alert-danger',
        })
      );
    });
};

// Login User
export const loginUser = (data, history) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
  return axios
    .post('http://localhost:4000/api/v1/auth/signin', data)
    .then((res) => {
      const { token, user } = res.data.data;
      dispatch(setCurrentUser({ user, token }));

      dispatch({
        type: SET_LOADING,
      });

      if (user.enable2FA) {
        dispatch({
          type: SET_ENABLE2FA,
          payload: true,
        });
      } else {
        dispatch(
          showAlert({
            message: res.data.message,
            type: 'alert-success',
          })
        );
        return history.push('/dashboard');
      }
    })
    .catch((err) => {
      let errorResp;
      if (_.has(err.response, 'data')) {
        const { error, status } = err.response.data;
        if (status === 500) {
          errorResp = 'This is not you, Please try again';
        } else {
          errorResp = error;
        }
      } else {
        errorResp = 'This is not you, Please try again';
      }
      dispatch({
        type: SET_LOADING,
      });
      return dispatch(
        showAlert({
          component: 'logIn',
          message: errorResp,
          type: 'alert-danger',
        })
      );
    });
};

export const disable2FA = () => ({
  type: SET_ENABLE2FA,
  payload: false,
});

export const verifyToken = (data, history) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
  axios
    .post('http://localhost:4000/api/v1/auth/2fa', data)
    .then((res) => {
      const { token, user } = res.data.data;

      dispatch({
        type: SET_LOADING,
      });

      // save token and user details to localStorage
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      // set token to Auth header
      setAuthToken(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: user,
      });
      dispatch({
        type: SET_ENABLE2FA,
        payload: false,
      });

      return history.push('/dashboard');
    })
    .catch((err) => {
      dispatch({
        type: SET_LOADING,
      });

      return dispatch(
        showAlert({
          component: 'verifyToken',
          message: err.response.data.error,
          type: 'alert-danger',
        })
      );
    });
};

export const clearCurrentUser = () => {
  // Remove token and user-details from localStorage
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('user');

  // Remove auth header for future requests
  setAuthToken(false);

  return {
    type: SET_CURRENT_USER,
    payload: {},
  };
};

// Set logged in user
export const setCurrentUser = ({ user, token }) => {
  
  // save token and user details to localStorage
  localStorage.setItem('jwtToken', token);
  localStorage.setItem('user', JSON.stringify(user));

  // set token to Auth header
  setAuthToken(token);
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Set current user to {} which will set isAuthenticated to false
  dispatch(clearCurrentUser());
};

export const changePassword = (data) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
  axios
    .patch('http://localhost:4000/api/v1/auth/update', data)
    .then((res) => logoutUser())
    .catch((err) => console.log(err.response));
};

export const updateDetails = (data) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
  axios
    .patch('http://localhost:4000/api/v1/auth/update', data)
    .then((res) => {
      console.log(res);
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data.data,
      });
    })
    .catch((err) => console.log(err.response));
};
