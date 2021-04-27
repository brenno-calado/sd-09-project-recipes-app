import { filtersDrink, filtersFood } from '../services/fetchFilters';

export const IS_FETCHING_FILTER = 'IS_FETCHING_FILTER';
export const IS_RESOLVED_FILTER = 'IS_RESOLVED_FILTER';
export const IS_REJECTED_FILTER = 'IS_REJECTED_FILTER';

const isFetching = () => ({
  type: IS_FETCHING_FILTER,
});

const isRejected = (error) => ({
  type: IS_REJECTED_FILTER,
  error,
});

const isResolved = (data) => ({
  type: IS_RESOLVED_FILTER,
  data,
});

export const filtersFetch = (page) => async (dispatch) => {
  dispatch(isFetching());
  try {
    if (page === 'Bebidas') {
      const response = await filtersDrink();
      dispatch(isResolved(response.drinks));
      return;
    }
    const response = await filtersFood();
    dispatch(isResolved(response.meals));
  } catch (error) {
    dispatch(isRejected(error));
  }
};
