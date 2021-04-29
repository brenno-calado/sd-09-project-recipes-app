import {
  GET_RECIPES,
  SEARCH_RECIPES,
  GET_DRINKS,
  SEARCH_DRINKS,
} from '../actions';

const INITIAL_STATE = {
  recipes: [],
  searchedRecipes: [],
  drinks: [],
  searchedDrinks: [],
};

export default function recipesReducer(state = INITIAL_STATE, actions) {
  switch (actions.type) {
  case GET_RECIPES:
    return {
      ...state,
      recipes: [...actions.recipes],
    };
  case SEARCH_RECIPES:
    return {
      ...state,
      searchedRecipes: [...actions.recipes],
    };
  case GET_DRINKS:
    return {
      ...state,
      drinks: [...actions.drinks],
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
