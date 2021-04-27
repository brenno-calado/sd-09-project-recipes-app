import { combineReducers } from 'redux';
import User from './User';
import cocktails from './cocktails';
import meals from './meals';

export default combineReducers({
  User,
  cocktails,
  meals,
});
