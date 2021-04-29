import { combineReducers } from 'redux';
import foodReducer from './foodReducer';
import drinkReducer from './drinkReducer';

const rootReducer = combineReducers({
  foodReducer,
  drinkReducer,
});

export default rootReducer;
