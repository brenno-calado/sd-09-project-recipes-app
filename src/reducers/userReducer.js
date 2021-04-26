import { SAVES_USER_DATA } from '../actions/userActions';

const INITIAL_STATE = {
  userData: undefined,
};

function userReducer(state = INITIAL_STATE, action) {
  const { payload } = action;
  switch (action.type) {
  case SAVES_USER_DATA:
    return {
      ...state,
      userData: payload,
    };
  default:
    return state;
  }
}

export default userReducer;
