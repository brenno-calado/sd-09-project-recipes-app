import types from '../types';

const { GET_RECIPES, REQUEST_RECIPES } = types;
const INITIAL_STATE = {
  isFetching: false,
  recipes: [],
};

const searchReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_RECIPES:
    return { ...state, isFetching: true };
  case GET_RECIPES:
    console.log(payload);
    return { ...state, isFetching: false, recipes: payload };
  default:
    return state;
  }
};

export default searchReducer;
