const INITIAL_STATE = {};

const drinkRecipeDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'STORE_DRINK_RECIPE_DETAILS':
    return {
      ...state,
      [action.id]: action.recipeDetails,
    };
  default:
    return state;
  }
};

export default drinkRecipeDetails;
