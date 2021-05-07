/* Action Aqui */
export const UPDATE_RECIPE_STATUS = 'UPDATE_RECIPE_STATUS';
export const SAVE_RECIPE_ORIGINAL_DATA = 'SAVE_RECIPE_ORIGINAL_DATA';

export const updateRecipeStatus = (status) => (
  {
    type: UPDATE_RECIPE_STATUS,
    payload: status,
  }
);

export const actionSaveRecipeOriginalData = (recipeData) => {
  console.log(recipeData);
  return {
    type: SAVE_RECIPE_ORIGINAL_DATA,
    payload: recipeData,
  };
};
