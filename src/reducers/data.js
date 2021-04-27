import { IS_FETCHING, IS_RESOLVED, IS_REJECTED } from '../actions/searchBar';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: '',
};

const setData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_FETCHING:
    return { ...state, loading: true };
  case IS_RESOLVED:
    return { ...state, loading: false, data: action.data };
  case IS_REJECTED:
    return { ...state, loading: false };
  default:
    return state;
  }
};

export default setData;
