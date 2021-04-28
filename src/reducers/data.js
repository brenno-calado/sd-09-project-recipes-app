import { IS_FILTERED } from '../actions/filterList';
import { IS_FETCHING, IS_RESOLVED, IS_REJECTED } from '../actions/searchBar';
import { IS_RESOLVED_RECOMMENDED_FOODS } from '../actions/MealById';

const INITIAL_STATE = {
  data: [],
  recommendedFoods: [],
  loading: true,
  error: '',
  ifFilter: false,
};

const setData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_FETCHING:
    return { ...state, loading: true };
  case IS_RESOLVED:
    return { ...state, loading: false, data: action.data };
  case IS_RESOLVED_RECOMMENDED_FOODS:
    return { ...state, loading: false, recommendedFoods: action.data };
  case IS_REJECTED:
    return { ...state, loading: false, error: action.error };
  case IS_FILTERED:
    return { ...state, loading: false, data: action.data, isFilter: true };
  default:
    return state;
  }
};

export default setData;
