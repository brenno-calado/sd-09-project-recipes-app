import { LOGIN } from '../actions';

const INITIAL_STATE = {
  user: { email: '' },
  favorites: [],
  doingRecipes: [],
  doneRecipes: [],
};

export default function userReducer(state = INITIAL_STATE, actions) {
  switch (actions.type) {
  case LOGIN:
    return {
      ...state,
      user: {
        email: actions.email,
      },
    };
  default:
    return {
      ...state,
    };
  }
}
