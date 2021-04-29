import { STORE_DATA_MEAL, STORE_CATEGORY_MEAL } from '../actions';

const INITIAL_STATE = {
  meals: {},
  category: {},
};

const foodReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case STORE_DATA_MEAL:
    return {
      ...state,
      meals: action.meals,
    };
  case STORE_CATEGORY_MEAL:
    return {
      ...state,
      category: action.category,
    };
  default:
    return state;
  }
};

export default foodReducer;
