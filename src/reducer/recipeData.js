import {
  UPDATE_RECIPE_STATUS,
  SAVE_RECIPE_ORIGINAL_DATA,
} from '../actions';

import getIngredients from '../services/recipeData';

const INITIAL_REDUCER = {
  recipeOriginalData: {},
  id: 1,
  isFinished: false,
  ingredients: [],
};

const recipeData = (state = INITIAL_REDUCER, action) => {
  switch (action.type) {
  case UPDATE_RECIPE_STATUS:
    return {
      ...state,
      isFinished: action.payload,
    };
  case SAVE_RECIPE_ORIGINAL_DATA:
    console.log(action.payload);
    return {
      ...state,
      recipeOriginalData: action.payload,
      ingredients: getIngredients(action.payload),
    };
  default:
    return state;
  }
};

export default recipeData;
