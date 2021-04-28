import {
  IS_FETCHING_FILTER,
  IS_RESOLVED_FILTER,
  IS_REJECTED_FILTER } from '../actions/filters';

const INITIAL_STATE = {
  filtersList: '',
  loading: true,
  error: '',
};

const setFilters = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_FETCHING_FILTER:
    return { ...state, loading: true };
  case IS_RESOLVED_FILTER:
    return { ...state, filtersList: action.data, loading: false };
  case IS_REJECTED_FILTER:
    return { ...state, error: action.error, loading: false };
  default:
    return state;
  }
};

export default setFilters;
