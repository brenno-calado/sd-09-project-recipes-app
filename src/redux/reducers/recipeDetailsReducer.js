import {
  SUCCESS_RECIPE,
  FETCHING_RECIPE,
  SUCCESS_RECOMMENDED,
  SAVE_INGREDIENTS,
  FETCHING_RECOMMENDED,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isFetchingRecommended: false,
  isFetchingRecipe: false,
  recipe: {},
  recommended: [],
  isRecommendedFetched: false,
  startedRecipes: [],
  ingredients: [],
};

function recipeDetailsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCHING_RECIPE:
    return ({ ...state, isFetchingRecipe: true });
  case SUCCESS_RECIPE:
    return ({
      ...state,
      recipe: action.data[0],
      isRecommendedFetched: true,
      isFetchingRecipe: false,
    });
  case FETCHING_RECOMMENDED:
    return ({ ...state, isFetchingRecommended: true });
  case SUCCESS_RECOMMENDED:
    return ({ ...state, recommended: action.data, isFetchingRecommended: false });
  case SAVE_INGREDIENTS:
    return ({ ...state, ingredients: action.ingredients });
  default:
    return state;
  }
}

export default recipeDetailsReducer;
