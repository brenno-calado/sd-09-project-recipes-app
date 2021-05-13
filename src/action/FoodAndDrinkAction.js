const magicNumber = 12;
const magicNumberFilter = 5;
const endpointP = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const FOOD_ACTION = 'FOOD_ACTION';

const getFoodAction = (food, foodBoolean, foodName) => ({
  type: FOOD_ACTION, food, foodBoolean, foodName });

export const foodThunkAction = (food, foodBoolean, foodName) => async (dispatch) => {
  let endpoint = endpointP;

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
    endpoint = endpointP;
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

export const FILTERORIGIN_ACTION = 'FILTERORIGIN_ACTION';

const getFilterOriginAction = (filterOrigin) => ({
  type: FILTERORIGIN_ACTION, filterOrigin });

export const filterOriginThunkAction = () => async (dispatch) => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(endpoint);
  const result = await response.json();
  return dispatch(getFilterOriginAction(result.meals));
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

export const SEARCHBAR_ACTION = 'SEARCHBAR_ACTION';

export const searchAction = (boolean) => {
  const searchBar = document.querySelector('.main');
  let searchBoolean = false;

  if (!boolean) {
    searchBar.style.marginTop = '160px';
    searchBoolean = true;
  } else {
    searchBar.style.marginTop = '56px';
    searchBoolean = false;
  }

  return ({ type: SEARCHBAR_ACTION, searchBoolean });
};

export const SEARCHBOOLEAN_ACTION = 'SEARCHBOOLEAN_ACTION';

const searchBoolean = () => ({ type: SEARCHBOOLEAN_ACTION });

const searchFunction = (search, input, type) => {
  let endpoint = '';

  if (search === 'ingredient') {
    endpoint = `https://www.the${type}db.com/api/json/v1/1/filter.php?i=${input}`;
  } else if (search === 'name') {
    endpoint = `https://www.the${type}db.com/api/json/v1/1/search.php?s=${input}`;
  } else if (search === 'firstLetter') {
    endpoint = `https://www.the${type}db.com/api/json/v1/1/search.php?f=${input}`;
  }
  return endpoint;
};

export const searchThunkAction = (search, input, type) => async (dispatch) => {
  const endpoint = searchFunction(search, input, type);

  let newType = `${type}s`;

  const response = await fetch(endpoint);
  const result = await response.json();

  console.log(!result[newType]);

  console.log(!result.drinks);

  if (!result[newType] && !result.drinks) {
    return (
      window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.'));
  }

  if (type === 'cocktail') {
    newType = 'drinks';
    dispatch(getDrinksAction(result[newType].slice(0, magicNumber)));
    return dispatch(searchBoolean());
  }
  dispatch(getFoodAction(result[newType].slice(0, magicNumber)));
  return dispatch(searchBoolean());
};

export const filterAreaThunkAction = (area) => async (dispatch) => {
  let endpoint = endpointP;
  if (area !== 'All') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  }
  const response = await fetch(endpoint);
  const result = await response.json();
  return dispatch(
    getFoodAction(result.meals.slice(0, magicNumber)),
  );
};

export const INGREDIENT_ACTION = 'INGREDIENT_ACTION';

export const ingredientAction = (ingredient) => ({ type: INGREDIENT_ACTION, ingredient });
