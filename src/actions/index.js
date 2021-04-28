import fetchRecipesData from '../services/fetchRecipesData';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const CLEAR_LIST = 'CLEAR_LIST';
const receiveRecipes = (recipesList, category) => ({
  type: FETCH_RECIPES,
  recipesType: category,
  recipesList,
});

export function searchRecipe(type, text, category) {
  return async (dispatch) => {
    const recipesList = await fetchRecipesData(type, text, category);
    console.log(recipesList);
    return dispatch(receiveRecipes(recipesList, category));
  };
}

export const clearList = () => ({
  type: CLEAR_LIST,
  recipesList: [],
});
