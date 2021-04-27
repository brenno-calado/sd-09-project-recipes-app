import { combineReducers } from 'redux';
import searchInputReducer from './SearchInputReducer';

const rootReducer = combineReducers({
  searchInputReducer,
});

export default rootReducer;
