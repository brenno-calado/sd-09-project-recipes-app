import {
  FETCHING,
  SUCCESS_RANDOM_RECOMMENDED,
  SUCESS_EXPLORE,
  SUCCESS_FETCH,
  SUCESS_AREA,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  explore: [],
  areas: [{ strArea: 'Selecione a opção' }, { strArea: 'All' }],
  randomRecommended: [],
  recipes: [],
};

function exploreRecipeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCHING:
    return ({ ...state, isFetching: true });
  case SUCESS_EXPLORE:
    return ({
      ...state,
      explore: action.data,
      isFetching: false,
    });
  case SUCESS_AREA:
    return ({
      ...state,
      areas: [...state.areas, ...action.data],
      isFetching: false,
    });
  case SUCCESS_FETCH:
    return ({
      ...state,
      recipes: action.data,
      isFetching: false,
    });
  case SUCCESS_RANDOM_RECOMMENDED:
    return ({ ...state, randomRecommended: action.data });
  default:
    return state;
  }
}

export default exploreRecipeReducer;
