import { combineReducers } from 'redux';
import setData from './data';
import setPage from './page';
import setFilters from './filters';

const rootReduce = combineReducers({ setData, setPage, setFilters });

export default rootReduce;
