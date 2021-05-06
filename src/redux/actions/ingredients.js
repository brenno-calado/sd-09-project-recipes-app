export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const sendIngredients = (ingredients) => ({
  type: GET_INGREDIENTS,
  ingredients,
});
