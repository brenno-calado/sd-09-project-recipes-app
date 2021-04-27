export const SAVES_USER_DATA = 'SAVES_USER_DATA';
export const TOGGLE_SEARCH_BAR = 'TOGGLE_SEARCH_BAR';
export const SAVE_MEALS = 'SAVE_MEALS';
export const SAVE_DRINKS = 'SAVE_DRINKS';

export const savesUserData = (userData) => ({
  type: SAVES_USER_DATA,
  payload: userData,
});

export const toggleSearchBar = () => ({
  type: TOGGLE_SEARCH_BAR,
});

export const saveMeals = (meals) => ({
  type: SAVE_MEALS,
  payload: meals,
});

export const saveDrinks = (drinks) => ({
  type: SAVE_DRINKS,
  payload: drinks,
});
