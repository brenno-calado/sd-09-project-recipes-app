export const SAVES_USER_DATA = 'SAVES_USER_DATA';
export const TOGGLE_SEARCH_BAR = 'TOGGLE_SEARCH_BAR';

export const savesUserData = (userData) => ({
  type: SAVES_USER_DATA,
  payload: userData,
});

export const toggleSearchBar = () => ({
  type: TOGGLE_SEARCH_BAR,
});
