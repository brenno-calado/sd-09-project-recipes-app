import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import recipeDetailsReducer from './recipeDetailsReducer';
import exploreRecipeReducer from  './exploreRecipeReducer';
import doneFavoriteReducer from './doneFavoriteReducer';

const rootReducer = combineReducers({
  recipesReducer,
  recipeDetailsReducer,
  exploreRecipeReducer,
  doneFavoriteReducer,
});

export default rootReducer;
