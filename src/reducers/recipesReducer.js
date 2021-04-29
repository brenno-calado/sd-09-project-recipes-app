import {
  GET_MEALS,
  GET_CATEGORIES_MEALS,
  SEARCH_MEALS,
  GET_DRINKS,
  GET_CATEGORIES_DRINKS,
  SEARCH_DRINKS,
} from '../actions';

const INITIAL_STATE = {
  meals: [],
  categoriesMeals: [],
  searchedMeals: [],
  drinks: [],
  categoriesDrinks: [],
  searchedDrinks: [],
};

export default function recipesReducer(state = INITIAL_STATE, actions) {
  switch (actions.type) {
  case GET_MEALS:
    return {
      ...state,
      meals: [...actions.meals],
    };
  case GET_CATEGORIES_MEALS:
    return {
      ...state,
      categoriesMeals: [...actions.categories],
    };
  case SEARCH_MEALS:
    return {
      ...state,
      searchedMeals: [...actions.meals],
    };
  case GET_DRINKS:
    return {
      ...state,
      drinks: [...actions.drinks],
    };
  case GET_CATEGORIES_DRINKS:
    return {
      ...state,
      categoriesDrinks: [...actions.categories],
    };
  case SEARCH_DRINKS:
    return {
      ...state,
      searchedDrinks: [...actions.drinks],
    };
  default:
    return {
      ...state,
    };
  }
}
