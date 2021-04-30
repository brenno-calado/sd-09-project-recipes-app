import {
  GET_MEALS,
  GET_CATEGORIES_MEALS,
  GET_DRINKS,
  GET_CATEGORIES_DRINKS,
  GET_RANDOM_RECIPE,
} from '../actions';

const INITIAL_STATE = {
  meals: [],
  categoriesMeals: [],
  drinks: [],
  categoriesDrinks: [],
  randomRecipe: { idMeal: '', idDrinks: '' },
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
  case GET_RANDOM_RECIPE:
    return {
      ...state,
      randomRecipe: { ...actions.randomRecipe },
    };
  default:
    return {
      ...state,
    };
  }
}
