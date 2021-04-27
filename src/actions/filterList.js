import { filteredDrinks, filteredFoods } from '../services/fetchFilteredRecipes';

export const IS_FETCHING = 'IS_FETCHING';
export const IS_FILTERED = 'IS_FILTERED';
export const IS_REJECTED = 'IS_REJECTED';

const isFetching = () => ({
  type: IS_FETCHING,
});

const isRejected = (error) => ({
  type: IS_REJECTED,
  error,
});

const isFiltered = (data) => ({
  type: IS_FILTERED,
  data,
});

export const filteredFetch = (filter, path) => async (dispatch) => {
  dispatch(isFetching());
  try {
    if (path === '/bebidas') {
      const response = await filteredDrinks(filter);
      dispatch(isFiltered(response.drinks));
      return;
    }
    const response = await filteredFoods(filter);
    dispatch(isFiltered(response.meals));
  } catch (error) {
    dispatch(isRejected(error));
  }
};
