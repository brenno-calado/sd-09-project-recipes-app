import { combineReducers } from 'redux';
import setData from './data';
import setPage from './page';
import setFilters from './filters';
import setItem from './item';
import setChecks from './checks';
import setAreas from './area';

const rootReduce = combineReducers({
  setData,
  setPage,
  setFilters,
  setItem,
  setChecks,
  setAreas,
});

export default rootReduce;
