import { combineReducers } from 'redux';
import searchBar from './searchBar';

// const testeReducer = (state = { resultado: 'false' }, action) => {
//   switch (action.type) {
//   case 'Teste':
//     return { resultado: action.frase };
//   default:
//     return state;
//   }
// };

const rootReducer = combineReducers({ searchBar });

export default rootReducer;
