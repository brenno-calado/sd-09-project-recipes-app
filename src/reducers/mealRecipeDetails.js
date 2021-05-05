const INITIAL_STATE = {};

const mealRecipeDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'STORE_MEAL_RECIPE_DETAILS':
    return {
      ...state,
      [action.id]: action.recipeDetails,
    };
  default:
    return state;
  }
};

export default mealRecipeDetails;
