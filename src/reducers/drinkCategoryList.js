import { DRINK } from '../actions';

const INITAL_STATE = {
  categories: [],
};

const drinkCategoriesList = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case DRINK:
    return {
      ...state,
      categories: [...action.categories],
    };
  default:
    return state;
  }
};

export default drinkCategoriesList;
