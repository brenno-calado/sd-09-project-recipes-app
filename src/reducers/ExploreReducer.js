const INITIAL_STATE = {
  image: [],
};

const exploreReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'INGREDIENTS_LIST':
    return ({ ...state, ingredientsList: action.ingredientsList });
  case 'INGREDIENT_IMG':
    return ({
      ...state,
      image: [
        ...state.image,
        action.image,
      ],
    });
  default:
    return state;
  }
};

export default exploreReducer;
