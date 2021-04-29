const INITIAL_STATE = {
  recipes: [],
  isLoading: true,
  categories: [],
  isCategory: false,
};

const searchInputReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SEARCH_RECIPES':
    return { ...state, recipes: action.recipes, isLoading: false };
  case 'SET_ISLOADING':
    return { ...state, isLoading: true };
  case 'SET_CATEGORIES':
    return {
      ...state,
      categories: action.categories,
      isLoading: false };
  case 'SET_ISCATEGORY_TO_TRUE':
    return { ...state, isCategory: true };
  case 'SET_ISCATEGORY_TO_FALSE':
    return { ...state, isCategory: false };
  default:
    return state;
  }
};

export default searchInputReducer;
