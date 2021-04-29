const INITIAL_STATE = {
  recipes: [],
  isLoading: true,
};

const searchInputReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SEARCH_RECIPES':
    return { ...state, recipes: action.recipes, isLoading: false };
  default:
    return state;
  }
};

export default searchInputReducer;
