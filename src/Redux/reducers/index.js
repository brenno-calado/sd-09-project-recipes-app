import { combineReducers } from 'redux';
import recipesList from './recipesList';

const rootReducer = combineReducers({
  recipesList,
});

export default rootReducer;
