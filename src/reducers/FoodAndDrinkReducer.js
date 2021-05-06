import {
  FOOD_ACTION,
  DRINKS_ACTION,
  FILTERFOOD_ACTION,
  FILTERORIGIN_ACTION,
  FILTERDRINKS_ACTION,
  SEARCHBAR_ACTION,
  SEARCHBOOLEAN_ACTION } from '../action/FoodAndDrinkAction';

const INITIAL_STATE = {
  food: [],
  filterFood: [],
  filterOrigin: [],
  foodName: '',
  foodBoolean: false,
  drinks: [],
  filterDrinks: [],
  drinkName: '',
  drinkBoolean: false,
  searchBar: false,
  searchBoolean: false,
};

function FoodAndDrinkReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FOOD_ACTION:
    return { ...state,
      food: action.food,
      foodName: action.foodName,
      foodBoolean: action.foodBoolean,
      searchBoolean: false };
  case FILTERFOOD_ACTION:
    return { ...state, filterFood: action.filterFood, searchBoolean: false };
  case FILTERORIGIN_ACTION:
    return { ...state, filterOrigin: action.filterOrigin, searchBoolean: false };
  case DRINKS_ACTION:
    return { ...state,
      drinks: action.drinks,
      drinkName: action.drinkName,
      drinkBoolean: action.drinkBoolean,
      searchBoolean: false };
  case FILTERDRINKS_ACTION:
    return { ...state, filterDrinks: action.filterDrinks, searchBoolean: false };
  case SEARCHBAR_ACTION:
    return { ...state, searchBar: action.searchBoolean };
  case SEARCHBOOLEAN_ACTION:
    return { ...state, searchBoolean: true };
  default:
    return state;
  }
}

export default FoodAndDrinkReducer;
