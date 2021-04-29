import { HANDLE_CHECKS } from '../actions/checks';

const INITIAL_STATE = {
  checks: {},
};

const setChecks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_CHECKS:
    return { ...state, checks: action.checks };
  default:
    return state;
  }
};

export default setChecks;
