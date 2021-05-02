import types from '../types';

const { GET_RECIPES, REQUEST_RECIPES, CLEAR_RECIPES } = types;
const INITIAL_STATE = {
  isFetching: false,
  recipes: [],
};

const getRecipes = (payload) => {
  const recipesKey = Object.keys(payload)[0];
  const recipesValue = payload[recipesKey];
  if (recipesValue) return Object.values(payload[recipesKey]);
  return null;
};

const searchReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_RECIPES:
    return { ...state, isFetching: true };
  case GET_RECIPES:
    return { ...state, isFetching: false, recipes: getRecipes(payload) };
  case CLEAR_RECIPES:
    return { ...state, isFetching: false, recipes: [] };
  default:
    return state;
  }
};

export default searchReducer;
