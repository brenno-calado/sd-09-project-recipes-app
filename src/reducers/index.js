import { combineReducers } from 'redux';
import FoodAndDrinkReducer from './FoodAndDrinkReducer';
import FoodAndDrinkDetailsReducer from './FoodAndDrinkDetailsReducer';
import ButtonReducer from './ButtonReducer';
import OriginReducer from './OriginReducer';

const rootReducer = combineReducers({
  FoodAndDrinkReducer,
  FoodAndDrinkDetailsReducer,
  ButtonReducer,
  OriginReducer,
});

export default rootReducer;
