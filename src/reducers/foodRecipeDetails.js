const INITIAL_STATE = {};

const foodRecipeDetails = (state = INITIAL_STATE, action) => {
  switch (action) {
  case 'STORE_DRINK_RECIPE_DETAILS':
    return {
      ...state,
      [action.recipeDetails.foodDrink]: action.recipeDetails,
    };
  default:
    return state;
  }
};

export default foodRecipeDetails;
