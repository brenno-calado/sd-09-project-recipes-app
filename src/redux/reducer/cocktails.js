import { REQUEST_COCKTAILS } from '../actions/cocktails';

const INITIAL_STATE = {
  loading: true,
  cocktails: [],
};

const cocktails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_COCKTAILS:
    return ({ ...state,
      loading: false,
      cocktails: action.cocktails,
    });
  default:
    return state;
  }
};

export default cocktails;
