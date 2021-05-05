import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import recipeDetailsReducer from './recipeDetailsReducer';
import exploreRecipeReducer from  './exploreRecipeReducer';

const rootReducer = combineReducers({
  recipesReducer,
  recipeDetailsReducer,
  exploreRecipeReducer,
});

export default rootReducer;
