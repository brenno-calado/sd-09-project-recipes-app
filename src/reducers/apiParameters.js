import { RECIPE_TYPE, RECIPE_QUERY, RECIPE_CASE } from '../actions';

const INITIAL_STATE = {
  type: 'meal',
  query: null,
  searchBy: null,
};

const apiParameters = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIPE_TYPE:
    return {
      ...state,
      type: action.mealOrDrink,
    };
  case RECIPE_QUERY:
    return {
      ...state,
      query: action.query,
    };
  case RECIPE_CASE:
    return {
      ...state,
      searchBy: action.searchBy,
    };
  default:
    return state;
  }
};

export default apiParameters;
