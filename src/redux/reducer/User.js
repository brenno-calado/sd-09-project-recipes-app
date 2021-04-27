// import { ADD_USER } from '../actions';

const INITTIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_USER':
    return { ...state, email: action.email, password: action.password };
  default:
    return state;
  }
};

export default user;
