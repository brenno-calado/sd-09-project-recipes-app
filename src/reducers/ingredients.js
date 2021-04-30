import { RESOLVED_INGREDIENTS, LOADING_INGREDIENTS,
  SAVE_INGREDIENT } from '../actions/Ingredients';

const INITIAL_STATE = {
  loading: true,
  data: '',
  ingredient: '',
};

const setIngredients = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING_INGREDIENTS:
    return {
      ...state, loading: true,
    };
  case RESOLVED_INGREDIENTS:
    return {
      ...state, loading: false, data: action.data,
    };
  case SAVE_INGREDIENT:
    return {
      ...state, ingredient: action.ingredient,
    };
  default:
    return state;
  }
};

export default setIngredients;
