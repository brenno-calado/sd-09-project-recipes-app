import {
  RECIPES_LIST,
  REQ_SEARCH,
  SET_SEARCH,
  NOT_FOUND,
  RESET_NOT_FOUND,
  DONT_FETCH,
  SHOULD_FETCH,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  notFound: false,
  shouldFetch: true,
};

const recipesList = (state = INITIAL_STATE, { type, recipes, items }) => {
  switch (type) {
  case RECIPES_LIST:
    return {
      ...state,
      list: recipes,
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
      list: items || [],
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
  case DONT_FETCH:
    return {
      ...state,
      shouldFetch: false,
    };
  case SHOULD_FETCH:
    return {
      ...state,
      shouldFetch: true,
    };
  default:
    return state;
  }
};

export default recipesList;
