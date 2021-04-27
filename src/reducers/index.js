import { combineReducers } from 'redux';
import setData from './data';
import setPage from './page';

const rootReduce = combineReducers({ setData, setPage });

export default rootReduce;
