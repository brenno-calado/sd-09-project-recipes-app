const INITIAL_STATE = {
  recipe: [],
  recommendations: [],
};

const recipeDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECIPE_DETAILS':
    return {
      ...state,
      recipe: action.recipeDetails,
    };
  case 'RECOMMENDATIONS_FETCH':
    return {
      ...state,
      recommendations: action.recommendations,
    };
  default:
    return state;
  }
};

export default recipeDetails;
