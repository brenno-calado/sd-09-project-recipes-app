import { combineReducers } from 'redux';
import exploreData from './exploreData';
import recipeData from './recipeData';

const rootReducer = combineReducers({
  exploreData,
  recipeData,
});

export default rootReducer;
