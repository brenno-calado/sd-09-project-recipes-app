import { createStore } from 'redux';
import rootReducer from '../reducer';

const extension = 'window.__REDUX_DEVTOOLS_EXTENSION__'
&& 'window.__REDUX_DEVTOOLS_EXTENSION__()';

const store = createStore(rootReducer, extension);

export default store;
