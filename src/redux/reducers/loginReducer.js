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
  isFetched: false,
  recipeType: '',
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
      isFetched: false,
    });
  case SUCCESS_FETCH:
    return ({
      ...state,
      data: [...action.data],
      recipeType: action.recipeType,
      isFetching: false,
      isFetched: true,
    });
  case FAILURE_FETCH:
    return ({
      ...state,
      data: [],
      error: action.error,
      isFetching: false,
      isFetched: true,
    });
  default:
    return state;
  }
}

export default loginReducer;
