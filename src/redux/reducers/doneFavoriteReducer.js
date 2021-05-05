import { SEND_DONE_RECIPES, SEND_FAVORITE_RECIPES } from '../actions/actionTypes';

const INITIAL_STATE = {
  doneRecipes: [],
  favoriteRecipes: [],
};

function doneFavoriteReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_DONE_RECIPES:
    return ({
      ...state,
      doneRecipes: action.recipes,
    });
  case SEND_FAVORITE_RECIPES:
    return ({
      ...state,
      favoriteRecipes: action.recipes,
    });
  default:
    return state;
  }
}

export default doneFavoriteReducer;
