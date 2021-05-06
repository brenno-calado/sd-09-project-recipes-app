import { FOOD_ACTION, FILTERFOOD_ACTION } from '../action/OriginAction';

const INITIAL_STATE = {
  food: [],
  filterFood: [],
  foodName: '',
  foodBoolean: false,
};

function OriginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FOOD_ACTION:
    return { ...state,
      food: action.food,
      foodName: action.foodName,
      foodBoolean: action.foodBoolean };
  case FILTERFOOD_ACTION:
    return { ...state, filterFood: action.filterFood };
  default:
    return state;
  }
}

export default OriginReducer;
