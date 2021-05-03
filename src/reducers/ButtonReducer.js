import {
  DONERECIPES_ACTION,
  FAVORITERECIPES_ACTION,
  INPROGRESSRECIPES_ACTION } from '../action/ButtonAction';

const INITIAL_STATE = {
  doneRecipes: [''],
  favoriteRecipes: [''],
  inProgressRecipes: {
    cocktails: {},
    meals: {},
  },
};

function ButtonReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DONERECIPES_ACTION:
    return { ...state, doneRecipes: action.doneRecipes };
  case FAVORITERECIPES_ACTION:
    return { ...state, favoriteRecipes: action.favoriteRecipes };
  case INPROGRESSRECIPES_ACTION:
    return { ...state,
      inProgressRecipes: {
        ...state.inProgressRecipes,
        ...action.progress } };
  default:
    return state;
  }
}

export default ButtonReducer;
