import axios from 'axios';
import { SET_CURRENT_USER, SET_ENABLE2FA } from './type';
import setAuthToken from '../utils/setAuthToken';
import { errorHandler, showAlert } from './alertAction';

// Register User
export const registerUser = (data, history) => (dispatch) => {
  return axios
    .post('/api/v1/auth/signup', data)
    .then((res) => {
      const { token, user } = res.data.data;
      // save token and user details to localStorage
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      // set token to Auth header
      setAuthToken(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: user,
      });
      dispatch(
        showAlert({
          message: res.data.message,
          type: 'alert-success',
        })
      );
      return history.push('/dashboard');
    })
    .catch((err) => {
      dispatch(errorHandler(err));
    });
};

// Login User
export const loginUser = (data, history) => (dispatch) => {
  return axios
    .post('/api/v1/auth/signin', data)
    .then((res) => {
      const { token, user } = res.data.data;
      dispatch(setCurrentUser({ user, token }));

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
      dispatch(errorHandler(err));
    });
};

export const disable2FA = () => ({
  type: SET_ENABLE2FA,
  payload: false,
});

export const verifyToken = (data, history) => (dispatch) => {
  axios
    .post('/api/v1/auth/2fa', data)
    .then((res) => {
      const { token, user } = res.data.data;

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
      return dispatch(
        errorHandler(err)
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
  axios
    .patch('/api/v1/auth/update', data)
    .then((res) => {
      dispatch(
        showAlert({
          message: res.data.message,
          type: 'alert-success',
        })
      );
      dispatch(logoutUser());
    })
    .catch((err) => dispatch(errorHandler(err)));
};

export const updateDetails = (data) => (dispatch) => {
  axios
    .patch('/api/v1/auth/update', data)
    .then((res) => {
      dispatch(
        showAlert({
          message: res.data.message,
          type: 'alert-success',
        })
      );
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data.data,
      });
    })
    .catch((err) => dispatch(errorHandler(err)));
};
