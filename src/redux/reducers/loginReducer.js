import {
  SAVE_PATH,
  FETCHING,
  SUCCESS_FETCH,
  FAILURE_FETCH,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  pathname: '',
  isFetching: false,
  data: [],
  error: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_PATH:
    return {
      ...state,
      pathname: action.pathname,
    };
  case FETCHING:
    return ({
      ...state,
      isFetching: true,
    });
  case SUCCESS_FETCH:
    return ({
      ...state,
      data: [...action.data.meals],
      isFetching: false,
    });
  case FAILURE_FETCH:
    return ({
      ...state,
      error: action.error,
      isFetching: false,
    });
  default:
    return state;
  }
}

export default loginReducer;
