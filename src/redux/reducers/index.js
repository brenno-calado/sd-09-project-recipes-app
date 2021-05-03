import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import recipeDetailsReducer from './recipeDetailsReducer';

const rootReducer = combineReducers({
  recipesReducer,
  recipeDetailsReducer,
});

export default rootReducer;
