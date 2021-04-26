export const ADD_USER = 'ADD_USER';
export const addUser = (email, password) => ({
  type: ADD_USER,
  email,
  password,
});
