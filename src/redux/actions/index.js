import { fetchMealsApi } from '../../services/index';

export const STORE_DATA_MEAL = 'STORE_DATA_MEAL';

export const STORE_DATA_DRINK = 'STORE_DATA_DRINK';

export const SAVE_DATA_FILTER = 'SAVE_DATA_FILTER';

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

export function saveFilterDataAction(data) {
  return receiveDataMeal(data);
}
