const addObj = (state = {}, action) => {
  switch (action.type) {
  case 'ADD_obj':
    return action.obj;
  default:
    return state;
  }
};

export default addObj;
