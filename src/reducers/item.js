import { ITEM_FETCHING, ITEM_RESOLVED, ITEM_REJECTED } from '../actions/itemById';

const INITIAL_STATE = {
  loading: true,
  item: '',
  error: '',
};

const item = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ITEM_FETCHING:
    return { ...state, loading: true };
  case ITEM_RESOLVED:
    return { ...state, loading: false, item: action.item };
  case ITEM_REJECTED:
    return { ...state, loading: false, error: action.error };
  default:
    return state;
  }
};

export default item;
