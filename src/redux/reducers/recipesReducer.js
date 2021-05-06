import {
  SAVE_PATH,
  FETCHING,
  SUCCESS_FETCH,
  FAILURE_FETCH,
  FETCHING_CATEGORIES,
  SUCCESS_CATEGORIES,
  FAILURE_CATEGORIES,
  CHANGE_PATH,
  SET_ERROR,
  SET_CURRENT_CATEGORY,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  pathname: '',
  isFetching: false,
  data: [],
  error: false,
  isFetched: false,
  recipeType: '',
  isFetchingCategories: false,
  categories: [],
  isFetchedCategories: false,
  currentCategory: '',
};

const magicNumber = 5;

function recipesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_PATH:
    return { ...state, pathname: action.pathname, recipeType: action.recipeType };
  case CHANGE_PATH:
    return ({
      ...state,
      pathname: action.pathname,
      recipeType: action.recipeType,
      data: [],
    });
  case FETCHING:
    return ({
      ...state,
      isFetching: true,
      isFetched: false,
      isFetchedCategories: false,
    });
  case SUCCESS_FETCH:
    return ({
      ...state,
      data: [...action.data],
      isFetching: false,
      isFetched: true,
      error: false,
    });
  case FAILURE_FETCH:
    return ({
      ...state,
      data: [],
      error: true,
      isFetching: false,
      isFetched: true,
    });
  case FETCHING_CATEGORIES:
    return ({ ...state, isFetchingCategories: true });
  case SUCCESS_CATEGORIES:
    return ({
      ...state,
      categories: action.data.slice(0, magicNumber),
      isFetchedCategories: true,
    });
  case FAILURE_CATEGORIES:
    return ({ ...state, error: action.error, isFetchedCategories: true });
  case SET_CURRENT_CATEGORY:
    return ({ ...state, currentCategory: action.category });
  case SET_ERROR:
    return ({ ...state, error: false });
  default:
    return state;
  }
}

export default recipesReducer;
