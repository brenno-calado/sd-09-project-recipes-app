const INITIAL_STATE = {
  recipes: [],
};

const searchInputReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SEARCH_RECIPES':
    return { ...state, recipes: action.recipes };
  default:
    return state;
  }
};

export default searchInputReducer;
