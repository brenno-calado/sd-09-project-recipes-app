import { REQUEST_MEALS } from '../actions/meals';

const INITIAL_STATE = {
  loading: false,
  meals: [],
};

const meals = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_MEALS:
    return ({ ...state,
      loading: true,
      meals: action.meals,
    });
  default:
    return state;
  }
};

export default meals;
