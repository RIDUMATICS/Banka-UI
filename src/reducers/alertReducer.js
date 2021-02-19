import { GET_ALERT } from '../actions/type';

const intialState = {
  component: '',
  message: '',
  type: ''
};

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_ALERT:
      return {
        ...state,
        component: action.payload.component,
        message: action.payload.message,
        type: action.payload.type
      };
    default:
      return state;
  }
}
