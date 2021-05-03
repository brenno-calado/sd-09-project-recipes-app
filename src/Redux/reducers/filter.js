import { COULD_REDIRECT, SELECT_FILTER } from '../actions/actionTypes';

const INITIAL_STATE = {
  couldRedirect: false,
  shouldFilter: true,
  currentFilter: '',
};

const filter = (state = INITIAL_STATE, { type, bool, newFilter }) => {
  switch (type) {
  case COULD_REDIRECT:
    return {
      ...state,
      couldRedirect: bool,
    };

  case SELECT_FILTER:
    return {
      ...state,
      currentFilter: newFilter,
    };

  default:
    return state;
  }
};

export default filter;
