import { TOGGLE_SEARCH_BAR, SAVE_MEALS } from '../actions/userActions';

const INITIAL_STATE = {
  isEnabled: true,
};

function userReducer(state = INITIAL_STATE, action) {
  const { payload } = action;
  switch (action.type) {
  case TOGGLE_SEARCH_BAR:
    return {
      ...state,
      isEnabled: !state.isEnabled,
    };
  case SAVE_MEALS:
    return {
      ...state,
      meals: payload,
    };
  default:
    return state;
  }
}

export default userReducer;
