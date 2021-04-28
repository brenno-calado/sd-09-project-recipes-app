import {
  RECIPES_LIST,
  REQ_SEARCH,
  SET_SEARCH,
  NOT_FOUND,
  RESET_NOT_FOUND,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  notFound: false,
};

const recipesList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIPES_LIST:
    return {
      ...state,
      list: action.recipes,
    };
  case REQ_SEARCH:
    return {
      ...state,
      isLoading: true,
    };
  case SET_SEARCH:
    return {
      ...state,
      isLoading: false,
      list: (action.items) ? action.items : [],
    };
  case NOT_FOUND:
    return {
      ...state,
      notFound: true,
      isLoading: false,
    };
  case RESET_NOT_FOUND:
    return {
      ...state,
      notFound: false,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default recipesList;
