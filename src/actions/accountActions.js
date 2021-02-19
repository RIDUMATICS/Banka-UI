import axios from 'axios';
import _ from 'lodash';
import { SET_ACCOUNTS, SET_ACCOUNT, SET_LOADING } from './type';
import { showAlert } from './alertAction';

export const getAccounts = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  return axios
    .get('http://localhost:4000/api/v1/accounts/user')
    .then((res) => {
      dispatch({
        type: SET_LOADING,
      });
      dispatch({
        type: SET_ACCOUNTS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      let errorResp;
      if (_.has(err.response, 'data')) {
        const { error } = err.response.data;
        errorResp = error;
      } else {
        errorResp = 'This is not you, Please try again';
      }

      dispatch({
        type: SET_LOADING,
      });

      return dispatch(
        showAlert({
          component: 'accounts',
          message: errorResp,
          type: 'alert-danger',
        })
      );
    });
};

export const createAccount = (data) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  axios
    .post('http://localhost:4000/api/v1/accounts', data)
    .then((res) => {
      console.log(res);
      dispatch(getAccounts()); // update all accounts
      dispatch({ type: SET_LOADING });
      dispatch(showAlert({
        component: 'dashboard',
        message: res.data.message,
        type: 'alert-success'
      }))
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
          component: 'dashboard',
          message: errorResp,
          type: 'alert-danger',
        })
      );
    });
};

export const creditAccount = (accountNumber, amount) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  return axios
    .post(`http://localhost:4000/api/v1/transactions/${accountNumber}/credit`, {
      amount,
    })
    .then((res) => {
      dispatch({
        type: SET_LOADING,
      });
      dispatch(showAlert({
        component: 'dashboard',
        message: res.data.message,
        type: 'alert-success'
      }))
    }
    )
    .catch((err) => {
      let errorResp;
      if (_.has(err.response, 'data')) {
        const { error } = err.response.data;
        errorResp = error;
      } else {
        errorResp = 'This is not you, Please try again';
      }

      dispatch({
        type: SET_LOADING,
      });

      return dispatch(
        showAlert({
          component: 'accounts',
          message: errorResp,
          type: 'alert-danger',
        })
      );
    });
};

export const debitAccount = (accountNumber, amount) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  return axios
    .post(`http://localhost:4000/api/v1/transactions/${accountNumber}/debit`, {
      amount,
    })
    .then((res) =>
      dispatch({
        type: SET_LOADING,
      })
    )
    .catch((err) => {
      let errorResp;
      if (_.has(err.response, 'data')) {
        const { error } = err.response.data;
        errorResp = error;
      } else {
        errorResp = 'This is not you, Please try again';
      }

      dispatch({
        type: SET_LOADING,
      });

      return dispatch(
        showAlert({
          component: 'accounts',
          message: errorResp,
          type: 'alert-danger',
        })
      );
    });
};

export const updateAccountStatus = (accountNumber, status, history) => (
  dispatch
) => {
  dispatch({
    type: SET_LOADING,
  });

  return axios
    .patch(`http://localhost:4000/api/v1/accounts/${accountNumber}`, {
      status,
    })
    .then((res) => {
      dispatch({
        type: SET_LOADING,
      });

      dispatch(showAlert({
        component: 'dashboard',
        message: res.data.message,
        type: 'alert-success'
      }));

      return dispatch({
        type: SET_ACCOUNT,
        payload: res.data.data,
      });
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
          component: 'accounts',
          message: errorResp,
          type: 'alert-danger',
        })
      );
    });
};

export const deleteAccount = (accountNumber, history) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  return axios
    .delete(`http://localhost:4000/api/v1/accounts/${accountNumber}`)
    .then((res) => {
      dispatch({
        type: SET_LOADING,
      });
      dispatch(showAlert({
        component: 'dashboard',
        message: 'Account Deleted',
        type: 'alert-success'
      }))
      return history.push('/dashboard/accounts');
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
          component: 'accounts',
          message: errorResp,
          type: 'alert-danger',
        })
      );
    });
};

export const getAccountDetails = (accountNumber) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  return axios
    .get(`http://localhost:4000/api/v1/accounts/${accountNumber}`)
    .then((res) => {
      dispatch({
        type: SET_LOADING,
      });

      return dispatch({
        type: SET_ACCOUNT,
        payload: res.data.data,
      });
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
          component: 'accounts',
          message: errorResp,
          type: 'alert-danger',
        })
      );
    });
};

export const getAllAccounts = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  return axios
    .get('http://localhost:4000/api/v1/accounts')
    .then((res) => {
      dispatch({
        type: SET_LOADING,
      });

      return dispatch({
        type: SET_ACCOUNTS,
        payload: res.data.data,
      });
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
          component: 'accounts',
          message: errorResp,
          type: 'alert-danger',
        })
      );
    });
};
