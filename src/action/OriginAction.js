const magicNumber = 12;

export const FOOD_ACTION = 'FOOD_ACTION';

const getFoodAction = (food, foodBoolean, foodName) => ({
  type: FOOD_ACTION, food, foodBoolean, foodName });

export const foodThunkAction = (food, foodBoolean, foodName) => async (dispatch) => {
  let endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  if (!food) {
    foodName = '';
    foodBoolean = false;
  }

  if (foodName === food && !foodBoolean) {
    foodBoolean = true;
  } else if (food || foodBoolean) {
    endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${food}`;
    foodBoolean = false;
    foodName = food;
  }

  if (food === 'All') {
    endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  }

  const response = await fetch(endpoint);
  const result = await response.json();
  return dispatch(
    getFoodAction(result.meals.slice(0, magicNumber), foodBoolean, foodName),
  );
};

export const FILTERFOOD_ACTION = 'FILTERFOOD_ACTION';

const getFilterFoodAction = (filterFood) => ({
  type: FILTERFOOD_ACTION, filterFood });

export const filterFoodThunkAction = () => async (dispatch) => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(endpoint);
  const result = await response.json();
  return dispatch(getFilterFoodAction(result.meals));
};
