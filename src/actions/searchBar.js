import { fetchFood, fetchDrink } from '../services/fetchSearchBar';

export const IS_FETCHING = 'IS_FETCHING';
export const IS_RESOLVED = 'IS_RESOLVED';
export const IS_REJECTED = 'IS_REJECTED';

const isFetching = () => ({
  type: IS_FETCHING,
});

const isRejected = (error) => ({
  type: IS_REJECTED,
  error,
});

const isResolved = (data) => ({
  type: IS_RESOLVED,
  data,
});

export const searchBarFetch = (obj) => async (dispatch) => {
  dispatch(isFetching());
  try {
    if (obj.page === 'Bebidas') {
      const response = await fetchDrink(obj.query, obj.searchValue);
      dispatch(isResolved(response.drinks));
      return;
    }
    const response = await fetchFood(obj.query, obj.searchValue);
    dispatch(isResolved(response.meals));
  } catch (error) {
    dispatch(isRejected(error));
  }
};
