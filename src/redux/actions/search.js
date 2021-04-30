import types from '../types';

const { SET_SEARCH_OPTIONS } = types;

const setSearchOptions = (payload) => ({
  type: SET_SEARCH_OPTIONS,
  payload,
});

export default setSearchOptions;
