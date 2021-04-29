import { combineReducers } from 'redux';
import setData from './data';
import setPage from './page';
import setFilters from './filters';
import setItem from './item';

const rootReduce = combineReducers({ setData, setPage, setFilters, setItem });

export default rootReduce;
