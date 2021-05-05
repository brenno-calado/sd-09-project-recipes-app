import { fetchDrinkById, fetchRecommendedDrinkById } from '../services/fetchDrinkById';

export const IS_FETCHING_DETAILS = 'IS_FETCHING_DETAILS';
export const IS_RESOLVED_DETAILS = 'IS_RESOLVED_DETAILS';
export const IS_RESOLVED_RECOMMENDED_FOODS = 'IS_RESOLVED_RECOMMENDED_FOODS';
export const IS_REJECTED_DETAILS = 'IS_REJECTED_DETAILS';

const isFetching = () => ({
  type: IS_FETCHING_DETAILS,
});

const isRejected = (error) => ({
  type: IS_REJECTED_DETAILS,
  error,
});

const isResolved = (data) => ({
  type: IS_RESOLVED_DETAILS,
  data,
});

const isResolvedRecommendedFoods = (data) => ({
  type: IS_RESOLVED_RECOMMENDED_FOODS,
  data,
});

export const getDrinkById = (ID) => async (dispatch) => {
  dispatch(isFetching());
  try {
    const responseDrink = await fetchDrinkById(ID);

    const responseRecommended = await fetchRecommendedDrinkById(responseDrink
      .drinks[0].strCategory);
    dispatch(isResolved(responseDrink.drinks[0]));
    dispatch(isResolvedRecommendedFoods(responseRecommended));
    return null;
  } catch (error) {
    dispatch(isRejected(error));
  }
};
