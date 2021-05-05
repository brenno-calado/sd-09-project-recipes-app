const INITIAL_REDUCER = {
  recipeInProgress: [],
};

const recipeInProgressReducer = (state = INITIAL_REDUCER, action) => {
  switch (action.type) {
  case 'RECIVE_RECIPE_IN_PROGRESS':
    return { recipeInProgress: action.recipeInProgress };
  default:
    return state;
  }
};

export default recipeInProgressReducer;
