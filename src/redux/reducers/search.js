import types from '../types';

const { SET_SEARCH_OPTIONS } = types;

const INITIAL_STATE = {};

const searchReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SET_SEARCH_OPTIONS:
    return payload;
  default:
    return state;
  }
};

export default searchReducer;
