import { FETCH_RECIPES } from '../actions';

const INITIAL_STATE = {
  recipesType: '',
  recipesList: [],
};

const recipes = (state = INITIAL_STATE, { type, recipesList, recipesType }) => {
  switch (type) {
  case FETCH_RECIPES:
    return {
      ...state,
      recipesType,
      recipesList,
    };
  default:
    return state;
  }
};

export default recipes;
