import {
  SUCCESS_RECIPE,
  SUCCESS_RECOMMENDED,
  ADD_STARTED_MEALS,
  ADD_STARTED_COCKTAILS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  recipe: {},
  recommended: [],
  isRecommendedFetched: false,
  startedMeals: [],
  startedCocktails: [],
  finishedMeals: [],
  finishedCocktails: [],
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
  case ADD_STARTED_MEALS:
    return ({ ...state, startedMeals: [...state.startedMeals, action.recipe] });
  case ADD_STARTED_COCKTAILS:
    return ({ ...state, startedCocktails: [...state.startedCocktails, action.recipe] });
  default:
    return state;
  }
}

export default recipeDetailsReducer;
