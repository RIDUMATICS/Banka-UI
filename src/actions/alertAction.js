import { GET_ALERT } from './type';
import _ from 'lodash';

export const clearAlert = () => ({
  type: GET_ALERT,
  payload: {
    component: '',
    message: '',
    type: '',
  },
});

export const showAlert = (payload) => (dispatch) => {
  setTimeout(() => dispatch(clearAlert()), 3000);
  dispatch({
    type: GET_ALERT,
    payload,
  });
};

export const errorHandler = (err) => (dispatch) => {
  console.log(err);
  let errorResp = 'Server Error, Please try again';
  if (_.has(err.response, 'data')) {
    const { error, status } = err.response.data;
    if (status !== 500) {
      // if the error status is not 500 override the default response
      errorResp = error;
    }
  }
  console.log(errorResp);
  dispatch(
    showAlert({
      component: 'dashboard',
      message: errorResp,
      type: 'alert-danger',
    })
  );
};
