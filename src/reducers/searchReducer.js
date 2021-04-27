import { TOGGLE_SEARCH_BAR } from '../actions/userActions';

const INITIAL_STATE = {
  isEnabled: true,
};

function userReducer(state = INITIAL_STATE, action) {
  // const { payload } = action;
  switch (action.type) {
  case TOGGLE_SEARCH_BAR:
    return {
      ...state,
      isEnabled: !state.isEnabled,
    };
  default:
    return state;
  }
}

export default userReducer;
