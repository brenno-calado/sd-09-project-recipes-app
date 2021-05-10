import paths from '../routes/paths';

const getRecipeDetailsPath = (recipeId, isFoodPage) => {
  const path = isFoodPage ? paths.FOODS : paths.DRINKS;
  return `${path}/${recipeId}`;
};

export default getRecipeDetailsPath;
