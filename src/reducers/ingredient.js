import { INGREDIENT } from '../actions';

const INITIAL_STATE = {
  ingredient: '',
};

const setExploredIngredient = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INGREDIENT:
    return {
      ...state,
      ingredient: action.ingredient,
    };
  default:
    return state;
  }
};

export default setExploredIngredient;
