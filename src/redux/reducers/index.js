import { combineReducers } from 'redux';
import recipes from './recipes';
import search from './search';
import category from './category';

export default combineReducers({
  recipes,
  search,
  category,
});
