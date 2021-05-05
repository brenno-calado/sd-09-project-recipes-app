import { combineReducers } from 'redux';
import setData from './data';
import setPage from './page';
import setFilters from './filters';
import setItem from './item';
import setChecks from './checks';
import setIngredients from './ingredients';
import setAreas from './area';
import setDetails from './details';

const rootReduce = combineReducers({
  setData,
  setPage,
  setFilters,
  setItem,
  setChecks,
  setIngredients,
  setAreas,
  setDetails,
});

export default rootReduce;
