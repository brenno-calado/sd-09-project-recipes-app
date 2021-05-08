const INPUT_CHANGE = 'INPUT_CHANGE';

const INITIAL_STATE = {
  checked: '',
};

const inputReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INPUT_CHANGE:
    return {
      ...state,
      checked: action.checked,
    };
  default:
    return state;
  }
};

export default inputReducer;
