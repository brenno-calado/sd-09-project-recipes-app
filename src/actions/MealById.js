import { fetchMealById } from '../services/fetchMealById';

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

export const getMealById = (ID) => async (dispatch) => {
  dispatch(isFetching());
  try {
    const response = await fetchMealById(ID);
    dispatch(isResolved(response.meals[0]));
    return;
  } catch (error) {
    dispatch(isRejected(error));
  }
};
