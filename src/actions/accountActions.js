import axios from 'axios';
import { SET_ACCOUNTS, SET_ACCOUNT } from './type';
import { errorHandler, showAlert } from './alertAction';

export const getAccounts = () => (dispatch) => {
  return axios
    .get('/api/v1/accounts/user')
    .then((res) => {
      dispatch({
        type: SET_ACCOUNTS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch(errorHandler(err));
    });
};

export const createAccount = (data) => (dispatch) => {
  axios
    .post('/api/v1/accounts', data)
    .then((res) => {
      dispatch(getAccounts()); // update all accounts
      dispatch(
        showAlert({
          message: res.data.message,
          type: 'alert-success',
        })
      );
    })
    .catch((err) => {
      dispatch(errorHandler(err));
    });
};

export const verifyAccount = (accountNumber) => (dispatch) => {
  return axios
    .get(`/api/v1/verify/${accountNumber}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      dispatch(errorHandler(err));
    });
};

export const creditAccount = (accountNumber, amount) => (dispatch) => {
  return axios
    .post(`/api/v1/transactions/${accountNumber}/credit`, {
      amount,
    })
    .then((res) => {
      dispatch(
        showAlert({
          message: res.data.message,
          type: 'alert-success',
        })
      );
    })
    .catch((err) => {
      dispatch(errorHandler(err));
    });
};

export const debitAccount = (accountNumber, amount) => (dispatch) => {
  return axios
    .post(`/api/v1/transactions/${accountNumber}/debit`, {
      amount,
    })
    .then((res) => {
      dispatch(
        showAlert({
          message: res.data.message,
          type: 'alert-success',
        })
      );
    })
    .catch((err) => {
      dispatch(errorHandler(err));
    });
};

export const transferAccount = (
  senderAcctNumber,
  receiverAcctNumber,
  password,
  amount
) => (dispatch) => {
  return axios
    .post(`/api/v1/transactions/${senderAcctNumber}/transfer`, {
      amount,
      password,
      receiverAcctNumber,
    })
    .then((res) => {
      dispatch(
        showAlert({
          message: res.data.message,
          type: 'alert-success',
        })
      );
      return res;
    })
    .catch((err) => {
      dispatch(errorHandler(err));
    });
};

export const updateAccountStatus = (accountNumber, status, history) => (
  dispatch
) => {
  return axios
    .patch(`/api/v1/accounts/${accountNumber}`, {
      status,
    })
    .then((res) => {
      dispatch(
        showAlert({
          message: res.data.message,
          type: 'alert-success',
        })
      );

      return dispatch({
        type: SET_ACCOUNT,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch(errorHandler(err));
    });
};

export const deleteAccount = (accountNumber, history) => (dispatch) => {
  return axios
    .delete(`/api/v1/accounts/${accountNumber}`)
    .then((res) => {
      dispatch(
        showAlert({
          message: 'Account Deleted',
          type: 'alert-success',
        })
      );
      return history.push('/dashboard/accounts');
    })
    .catch((err) => {
      dispatch(errorHandler(err));
    });
};

export const getAccountDetails = (accountNumber) => (dispatch) => {
  return axios
    .get(`/api/v1/accounts/${accountNumber}`)
    .then((res) => {
      dispatch({
        type: SET_ACCOUNT,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch(errorHandler(err));
    });
};

export const getAllAccounts = () => (dispatch) => {
  return axios
    .get('/api/v1/accounts')
    .then((res) => {
      dispatch({
        type: SET_ACCOUNTS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch(errorHandler(err));
    });
};
