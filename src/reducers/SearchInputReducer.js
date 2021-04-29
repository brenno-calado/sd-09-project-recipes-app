const INITIAL_STATE = {
  recipes: [],
  isLoading: true,
  categories: [],
};

const searchInputReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SEARCH_RECIPES':
    return { ...state, recipes: action.recipes, isLoading: false };
  case 'SET_ISLOADING':
    return { ...state, isLoading: true };
  case 'SET_CATEGORIES':
    return { ...state, categories: action.categories, isLoading: false };
  default:
    return state;
  }
};

export default searchInputReducer;
