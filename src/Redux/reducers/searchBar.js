import { SEARCH } from '../actions/actionTypes';

const INITIAL_STATE = {
  search: false,
};

const searchBar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH:
    return { ...state, search: !state.search };
  default:
    return state;
  }
};

export default searchBar;
