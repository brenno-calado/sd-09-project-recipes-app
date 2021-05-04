import types from '../types';

const { REQUEST_CATEGORIES, GET_CATEGORIES } = types;
const INITIAL_STATE = {
  isFetchingCategories: false,
  categories: [],
};

const categoryReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_CATEGORIES:
    return { ...state, isFetchingCategories: true };
  case GET_CATEGORIES:
    return { ...state, isFetchingCategories: false, categories: payload };
  default:
    return state;
  }
};

export default categoryReducer;
