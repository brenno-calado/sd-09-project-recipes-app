export const fetchMealCategoryList = async () => {
  try {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const request = await fetch(endpoint);
    const promise = await request.json();
    return promise.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinkCategoryList = async () => {
  try {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const request = await fetch(endpoint);
    const promise = await request.json();
    return promise.drinks;
  } catch (error) {
    console.log(error);
  }
};
