import { SAVE_PATH } from '../actions/actionTypes';

const INITIAL_STATE = {
  pathname: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_PATH:
    return {
      ...state,
      pathname: action.pathname,
    };
  default:
    return state;
  }
}

export default loginReducer;
