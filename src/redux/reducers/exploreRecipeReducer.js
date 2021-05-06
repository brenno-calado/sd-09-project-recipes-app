import {
  SUCCESS_RANDOM_RECOMMENDED,
  SUCESS_EXPLORE,
  SUCESS_AREA,
  FROM_EXPLORE,
  FETCHING_EXPLORE,
  SUCCESS_FETCH_BY_AREA,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  explore: [],
  areas: [{ strArea: 'Selecione a opção' }, { strArea: 'All' }],
  randomRecommended: [],
  recipes: [],
  cameFromExplore: false,
};

function exploreRecipeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCHING_EXPLORE:
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
  case SUCCESS_FETCH_BY_AREA:
    return ({
      ...state,
      recipes: action.data,
      isFetching: false,
    });
  case SUCCESS_RANDOM_RECOMMENDED:
    return ({ ...state, randomRecommended: action.data });
  case FROM_EXPLORE:
    return ({ ...state, cameFromExplore: action.bool });
  default:
    return state;
  }
}

export default exploreRecipeReducer;
