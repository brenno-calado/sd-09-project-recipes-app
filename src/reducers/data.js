import { IS_FILTERED } from '../actions/filterList';
import { IS_FETCHING, IS_RESOLVED, IS_REJECTED } from '../actions/searchBar';

const INITIAL_STATE = {
  data: [],
  loading: true,
  error: '',
  ifFilter: false,
};

const setData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_FETCHING:
    return { ...state, loading: true };
  case IS_RESOLVED:
    return { ...state, loading: false, data: action.data, isFilter: false };
  case IS_REJECTED:
    return { ...state, loading: false, error: action.error };
  case IS_FILTERED:
    return { ...state, loading: false, data: action.data, isFilter: true };
  default:
    return state;
  }
};

export default setData;
