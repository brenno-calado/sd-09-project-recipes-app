import { combineReducers } from 'redux';
import User from './User';
import cocktails from './cocktails';
import meals from './meals';
import objDetails from './objDetails';
import ingredients from './ingredients';

export default combineReducers({
  User,
  cocktails,
  meals,
  objDetails,
  ingredients,
});
