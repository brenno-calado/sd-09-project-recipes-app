import { fetchMealsApi } from '../../services/index';

export const STORE_DATA_MEAL = 'STORE_DATA_MEAL';

export const STORE_DATA_DRINK = 'STORE_DATA_DRINK';

const receiveDataMeal = (data) => ({
  type: STORE_DATA_MEAL,
  data,
});

export function fetchAPI() {
  return async (dispatch) => {
    const response = await fetchMealsApi();
    return dispatch(receiveDataMeal(response));
  };
}
