import {
  SAVE_PATH,
  FETCHING,
  SUCCESS_FETCH,
  FAILURE_FETCH,
  FETCHING_CATEGORIES,
  SUCCESS_CATEGORIES,
  FAILURE_CATEGORIES,
  SUCCESS_RECIPE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  pathname: '',
  isFetching: false,
  data: [],
  error: '',
  isFetched: false,
  recipeType: '',
  isFetchingCategories: false,
  categories: [],
  isFetchedCategories: false,
  recipe: {},
};

const magicNumber = 5;

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_PATH:
    return {
      ...state,
      pathname: action.pathname,
      recipeType: action.recipeType,
    };
  case FETCHING:
    return ({
      ...state,
      isFetching: true,
      isFetched: false,
    });
  case SUCCESS_FETCH:
    return ({
      ...state,
      data: [...action.data],
      isFetching: false,
      isFetched: true,
    });
  case FAILURE_FETCH:
    return ({
      ...state,
      data: [],
      error: action.error,
      isFetching: false,
      isFetched: true,
    });
  case FETCHING_CATEGORIES:
    return ({
      ...state,
      isFetchingCategories: true,
    });
  case SUCCESS_CATEGORIES:
    return ({
      ...state,
      categories: action.data.slice(0, magicNumber),
      isFetchedCategories: true,
    });
  case FAILURE_CATEGORIES:
    return ({
      ...state,
      error: action.error,
      isFetchedCategories: true,
    });
  case SUCCESS_RECIPE:
    return ({ ...state, recipe: action.data[0] });
  default:
    return state;
  }
}

export default loginReducer;
