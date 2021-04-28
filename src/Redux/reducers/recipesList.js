import { RECIPES_LIST } from '../actions/actionTypes';

const INITIAL_STATE = {
  listType: '',
  list: [],
};

const recipesList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIPES_LIST:
    return {
      ...state,
      listType: action.listType,
      list: action.recipes,
    };

  default:
    return state;
  }
};

export default recipesList;
