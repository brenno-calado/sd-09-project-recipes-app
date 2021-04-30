import { FETCH_RECIPES, CLEAR_LIST, REDIRECT } from '../actions';

const INITIAL_STATE = {
  recipesType: '',
  recipesList: [],
  redirect: false,
};

const recipes = (state = INITIAL_STATE, { type, recipesList, recipesType }) => {
  switch (type) {
  case FETCH_RECIPES:
    if (recipesList === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return {
        ...state,
        recipesType,
        recipesList: [],
      };
    }
    return {
      ...state,
      recipesType,
      recipesList,
    };
  case CLEAR_LIST:
    return {
      ...state,
      recipesList,
    };
  case REDIRECT:
    return {
      ...state,
      redirect: true,
    };
  default:
    return state;
  }
};

export default recipes;
