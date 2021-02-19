import axios from 'axios';
import _ from 'lodash';
import {GET_TRANSACTIONS } from './type';
import { showAlert } from './alertAction';

export const getTransactions = (accountNumber) => dispatch => (
  axios
  .get(`http://localhost:4000/api/v1/accounts/${accountNumber}/transactions`)
  .then((res) => {
    dispatch({
    type: GET_TRANSACTIONS,
    payload: res.data.data
  })
  })
  .catch((err) => {
    let errorResp;
    if (_.has(err.response, 'data')) {
      const {
        error,
        status
      } = err.response.data;
      if (status === 500) {
        errorResp = 'This is not you, Please try again';
      } else {
        errorResp = error;
      }
    } else {
      errorResp = 'This is not you, Please try again';
    }

    return dispatch(
      showAlert({
        component: 'transaction',
        message: errorResp,
        type: 'error'
      })
    );

      
  })
)