import { combineReducers } from 'redux';
import setData from './data';
import setPage from './page';
import setFilters from './filters';
import setItem from './item';
import setChecks from './checks';
import setIngredients from './ingredients';

const rootReduce = combineReducers({
  setData,
  setPage,
  setFilters,
  setItem,
  setChecks,
  setIngredients,
});

export default rootReduce;
