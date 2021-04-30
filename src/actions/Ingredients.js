import fetchIngredients from '../services/fetchIngredientes';

export const LOADING_INGREDIENTS = 'LOADING_INGREDIENTS';
export const RESOLVED_INGREDIENTS = 'RESOLVED_INGREDIENTS';
export const SAVE_INGREDIENT = 'SAVE_INGREDIENT';

export const saveIngredient = (ingredient) => ({
  type: SAVE_INGREDIENT,
  ingredient,
});

const loading = () => ({
  type: LOADING_INGREDIENTS,
});

const resolved = (arr) => ({
  type: RESOLVED_INGREDIENTS,
  data: arr,
});

export const ingredientsFetch = (page) => async (dispatch) => {
  dispatch(loading());
  const arr = await fetchIngredients(page);
  dispatch(resolved(arr));
};
