import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import recipeDetailsReducer from './recipeDetailsReducer';
import doneFavoriteReducer from './doneFavoriteReducer';

const rootReducer = combineReducers({
  recipesReducer,
  recipeDetailsReducer,
  doneFavoriteReducer,
});

export default rootReducer;
