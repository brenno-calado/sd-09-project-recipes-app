export const STORE_DATA_MEAL = 'STORE_DATA_MEAL';
export const STORE_CATEGORY_MEAL = 'STORE_CATEGORY_MEAL';

export const STORE_DATA_DRINK = 'STORE_DATA_DRINK';
export const STORE_CATEGORY_DRINK = 'STORE_CATEGORY_DRINK';

export const receiveDataMeal = (meals) => ({
  type: STORE_DATA_MEAL,
  meals,
});

export const receiveCategoryMeal = (category) => ({
  type: STORE_CATEGORY_MEAL,
  category,
});

export const receiveDataDrink = (drinks) => ({
  type: STORE_DATA_DRINK,
  drinks,
});

export const receiveCategoryDrink = (category) => ({
  type: STORE_CATEGORY_DRINK,
  category,
});
