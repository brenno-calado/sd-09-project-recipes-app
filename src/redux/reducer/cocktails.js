import { REQUEST_COCKTAILS } from '../actions/cocktails';
import { IS_LOADING } from '../actions';

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
  case IS_LOADING:
    return ({ ...state,
      loading: true,
    });
  default:
    return state;
  }
};

export default cocktails;
