import { SEARCH, REQ_SEARCH, SET_SEARCH } from '../actions/actionTypes';

const INITIAL_STATE = {
  search: false,
  isLoading: false,
  items: [],
};

const searchBar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH:
    return { ...state, search: !state.search };
  case REQ_SEARCH:
    return { ...state, isLoading: true };
  case SET_SEARCH:
    return { ...state, isLoading: false, items: (action.items) ? action.items : [] };
  default:
    return state;
  }
};

export default searchBar;
