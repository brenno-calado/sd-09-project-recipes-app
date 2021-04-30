import {
  SUCCESS_RECIPE,
  SUCCESS_RECOMMENDED,
  ADD_STARTED_RECIPE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  recipe: {},
  recommended: [],
  isRecommendedFetched: false,
  startedRecipes: [],
  finishedRecipes: [],
};

function recipeDetailsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUCCESS_RECIPE:
    return ({
      ...state,
      recipe: action.data[0],
      isRecommendedFetched: true,
    });
  case SUCCESS_RECOMMENDED:
    return ({ ...state, recommended: action.data });
  case ADD_STARTED_RECIPE:
    return ({ ...state, startedRecipes: [...state.startedRecipes, action.recipe] });
  default:
    return state;
  }
}

export default recipeDetailsReducer;
