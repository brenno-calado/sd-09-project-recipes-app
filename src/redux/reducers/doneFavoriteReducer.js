import { SEND_DONE_RECIPES } from '../actions/actionTypes';

const INITIAL_STATE = {
  doneRecipes: [],
};

function doneFavoriteReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_DONE_RECIPES:
    return ({
      ...state,
      doneRecipes: action.recipes,
    });
  default:
    return state;
  }
}

export default doneFavoriteReducer;
