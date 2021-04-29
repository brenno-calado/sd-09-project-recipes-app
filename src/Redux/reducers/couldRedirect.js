import { COULD_REDIRECT } from '../actions/actionTypes';

const INITIAL_STATE = false;

const couldRedirect = (state = INITIAL_STATE, { type, bool }) => {
  switch (type) {
  case COULD_REDIRECT:
    return bool;

  default:
    return state;
  }
};

export default couldRedirect;
