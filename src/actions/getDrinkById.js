import { fetchDrinkById, fetchRecommendedDrinkById } from '../services/fetchDrinkById';

export const IS_FETCHING = 'IS_FETCHING';
export const IS_RESOLVED = 'IS_RESOLVED';
export const IS_RESOLVED_RECOMMENDED_FOODS = 'IS_RESOLVED_RECOMMENDED_FOODS';
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
