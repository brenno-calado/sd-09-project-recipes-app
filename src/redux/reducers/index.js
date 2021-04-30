import { combineReducers } from 'redux';
import recipes from './recipes';
import search from './search';

export default combineReducers({
  recipes,
  search,
});
