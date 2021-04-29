import { MEAL } from '../actions';

const INITAL_STATE = {
  categories: [],
};

const mealCategoriesList = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case MEAL:
    return {
      ...state,
      categories: [...action.categories],
    };
  default:
    return state;
  }
};

export default mealCategoriesList;
