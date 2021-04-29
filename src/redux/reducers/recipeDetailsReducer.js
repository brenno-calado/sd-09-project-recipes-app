import {
  SUCCESS_RECIPE,
  SUCCESS_RECOMMENDED,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  recipe: {},
  recommended: [],
  isRecommendedFetched: false,
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
  default:
    return state;
  }
}

export default recipeDetailsReducer;
