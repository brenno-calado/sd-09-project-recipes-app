export const SAVES_USER_DATA = 'SAVES_USER_DATA';

export const savesUserData = (userData) => ({
  type: SAVES_USER_DATA,
  payload: userData,
});
