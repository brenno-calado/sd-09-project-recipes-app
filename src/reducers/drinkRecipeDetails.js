const INITIAL_STATE = {};

const drinkRecipeDetails = (state = INITIAL_STATE, action) => {
  switch (action) {
  case 'STORE_DRINK_RECIPE_DETAILS':
    return {
      ...state,
      [action.recipeDetails.idDrink]: action.recipeDetails,
    };
  default:
    return state;
  }
};

export default drinkRecipeDetails;
