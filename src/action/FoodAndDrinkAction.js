const magicNumber = 12;
const magicNumberFilter = 5;

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
    endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${food}`;
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
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  const result = await response.json();
  return dispatch(getFilterFoodAction(result.meals.slice(0, magicNumberFilter)));
};

export const DRINKS_ACTION = 'DRINKS_ACTION';

const getDrinksAction = (drinks, drinkBoolean, drinkName) => ({
  type: DRINKS_ACTION, drinks, drinkBoolean, drinkName });

export const drinksThunkAction = (drink, drinkBoolean, drinkName) => async (dispatch) => {
  let endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  if (!drink) {
    drinkName = '';
    drinkBoolean = false;
  }

  if (drinkName === drink && !drinkBoolean) {
    drinkBoolean = true;
  } else if (drink || drinkBoolean) {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`;
    drinkBoolean = false;
    drinkName = drink;
  }

  if (drink === 'All') {
    endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }

  const response = await fetch(endpoint);
  const result = await response.json();
  return dispatch(
    getDrinksAction(result.drinks.slice(0, magicNumber), drinkBoolean, drinkName),
  );
};

export const FILTERDRINKS_ACTION = 'FILTERDRINKS_ACTION';

const getFilterDrinksAction = (filterDrinks) => ({
  type: FILTERDRINKS_ACTION, filterDrinks });

export const filterDrinksThunkAction = () => async (dispatch) => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  const result = await response.json();
  return dispatch(getFilterDrinksAction(result.drinks.slice(0, magicNumberFilter)));
};
