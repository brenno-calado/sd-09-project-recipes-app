import fetchRecipesData from '../services/fetchRecipesData';

export const FETCH_RECIPES = 'FETCH_RECIPES';

const receiveRecipes = (recipesList, category) => ({
  type: FETCH_RECIPES,
  recipesType: category,
  recipesList,
});

export function searchRecipe(type, text, category) {
  return async (dispatch) => {
    const recipesList = await fetchRecipesData(type, text, category);
    return dispatch(receiveRecipes(recipesList, category));
  };
}
