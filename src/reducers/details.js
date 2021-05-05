import {
  IS_FETCHING_DETAILS,
  IS_RESOLVED_DETAILS,
  IS_REJECTED_DETAILS,
} from '../actions/getDrinkById';
import { IS_RESOLVED_RECOMMENDED_FOODS } from '../actions/MealById';

const INITIAL_STATE = {
  data: [],
  loading: true,
  error: '',
};

const setDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_FETCHING_DETAILS:
    return { ...state, loading: true };
  case IS_RESOLVED_DETAILS:
    return { ...state, loading: false, data: action.data };
  case IS_RESOLVED_RECOMMENDED_FOODS:
    return { ...state, loading: false, recommendedFoods: action.data };
  case IS_REJECTED_DETAILS:
    return { ...state, loading: false, error: action.error };
  default:
    return state;
  }
};

export default setDetails;
