import { combineReducers } from 'redux';
import FoodAndDrinkReducer from './FoodAndDrinkReducer';
import FoodAndDrinkDetailsReducer from './FoodAndDrinkDetailsReducer';
import ButtonReducer from './ButtonReducer';

const rootReducer = combineReducers({
  FoodAndDrinkReducer,
  FoodAndDrinkDetailsReducer,
  ButtonReducer,
});

export default rootReducer;
