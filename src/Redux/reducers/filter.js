import { COULD_REDIRECT } from '../actions/actionTypes';

const INITIAL_STATE = {
  couldRedirect: false,
  shouldFilter: true,
};

const filter = (state = INITIAL_STATE, { type, bool }) => {
  switch (type) {
  case COULD_REDIRECT:
    return {
      ...state,
      couldRedirect: bool,
    };

  default:
    return state;
  }
};

export default filter;
