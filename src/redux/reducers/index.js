import { combineReducers } from 'redux';
import foodReducer from './foodReducer';

const rootReducer = combineReducers({
  foodReducer,
});

export default rootReducer;
