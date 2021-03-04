import { SET_ACCOUNT } from "../actions/type";

const intialState = {
  transactions: []
};

export default function(state = intialState, action) {
  switch(action.type) {
    case SET_ACCOUNT:
      return action.payload
    default:
      return state;
  }
}

