import { STORE_DATA_MEAL } from '../actions';

const INITIAL_STATE = {
  meals: {},
};

const foodReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case STORE_DATA_MEAL:
    return {
      ...state,
      meals: action.data,
    };
  default:
    return state;
  }
};

export default foodReducer;
