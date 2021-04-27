import { SET_PAGE } from '../actions/page';

const INITIAL_STATE = {
  page: 'comidas',
};

const setPage = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PAGE:
    return { ...state, page: action.page };
  default:
    return state;
  }
};

export default setPage;
