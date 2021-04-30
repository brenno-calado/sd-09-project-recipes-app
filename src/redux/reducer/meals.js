import { REQUEST_MEALS } from '../actions/meals';
import { IS_LOADING } from '../actions';

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
  case IS_LOADING:
    return ({ ...state,
      loading: true,
    });
  default:
    return state;
  }
};

export default meals;
