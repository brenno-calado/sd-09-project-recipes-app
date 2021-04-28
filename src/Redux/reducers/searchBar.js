import { REQ_SEARCH, SET_SEARCH, NOT_FOUND, RESET_NOT_FOUND } from '../actions/actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  notFound: false,
  items: [],
};

const searchBar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQ_SEARCH:
    return { ...state, isLoading: true };
  case SET_SEARCH:
    return { ...state, isLoading: false, items: (action.items) ? action.items : [] };
  case NOT_FOUND:
    return { ...state, notFound: true, isLoading: false };
  case RESET_NOT_FOUND:
    return { ...state, notFound: false, isLoading: false };
  default:
    return state;
  }
};

export default searchBar;
