import { GET_INGREDIENTS } from '../actions/ingredients';

const getIngredients = (state = [], action) => {
  switch (action.type) {
  case GET_INGREDIENTS:
    return ({ ...state, ingredients: action.ingredients });
  default:
    return state;
  }
};

export default getIngredients;
