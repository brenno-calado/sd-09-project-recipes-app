import { STORE_DATA_DRINK, STORE_CATEGORY_DRINK } from '../actions';

const INITIAL_STATE = {
  drinks: {},
  category: {},
};

const drinkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case STORE_DATA_DRINK:
    return {
      ...state,
      drinks: action.drinks,
    };
  case STORE_CATEGORY_DRINK:
    return {
      ...state,
      category: action.category,
    };
  default:
    return state;
  }
};

export default drinkReducer;
