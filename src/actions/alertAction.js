import { GET_ALERT } from './type';

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
