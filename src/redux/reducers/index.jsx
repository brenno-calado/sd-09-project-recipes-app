import { combineReducers } from 'redux';
import inputReducer from './inputReducer';

const rootReducer = combineReducers({
  inputReducer,
});

export default rootReducer;
