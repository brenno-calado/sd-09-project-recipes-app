import {
  FOOD_ACTION,
  DRINKS_ACTION,
  FILTERFOOD_ACTION,
  FILTERORIGIN_ACTION,
  FILTERDRINKS_ACTION } from '../action/FoodAndDrinkAction';

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
};

function FoodAndDrinkReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FOOD_ACTION:
    return { ...state,
      food: action.food,
      foodName: action.foodName,
      foodBoolean: action.foodBoolean };
  case FILTERFOOD_ACTION:
    return { ...state, filterFood: action.filterFood };
  case FILTERORIGIN_ACTION:
    return { ...state, filterOrigin: action.filterOrigin };
  case DRINKS_ACTION:
    return { ...state,
      drinks: action.drinks,
      drinkName: action.drinkName,
      drinkBoolean: action.drinkBoolean };
  case FILTERDRINKS_ACTION:
    return { ...state, filterDrinks: action.filterDrinks };
  default:
    return state;
  }
}

export default FoodAndDrinkReducer;
