const getFoodAll = async () => {
  try {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endpoint);
    const meals = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

const getFoodCategories = async () => {
  try {
    const categoriesEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(categoriesEndpoint);
    const foodCategories = await response.json();
    return foodCategories;
  } catch (error) {
    console.log(error);
  }
};

const getFoodByCategory = async (category) => {
  try {
    const filterEndpoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
    const response = await fetch(`${filterEndpoint}${category}`);
    const meals = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

const getFoodByName = async (name) => {
  try {
    const filterEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(`${filterEndpoint}${name}`);
    const meals = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

const getFoodByIngredient = async (ingredient) => {
  try {
    const filterEndpoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
    const response = await fetch(`${filterEndpoint}${ingredient}`);
    const meals = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

const getFoodByFirstLetter = async (firstLetter) => {
  try {
    const filterEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
    const response = await fetch(`${filterEndpoint}${firstLetter}`);
    const meals = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

const getRandomFood = async () => {
  try {
    const randomEndpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const data = await fetch(randomEndpoint);
    const result = await data.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getFoodById = async (id) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.log(error);
  }
};

const getFoodIngredientsList = async () => {
  try {
    const ingredientsEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const data = await fetch(ingredientsEndpoint);
    const result = await data.json();
    return result.meals;
  } catch (error) {
    console.log(error);
  }
};

const getFoodAreasList = async () => {
  try {
    const areasEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const data = await fetch(areasEndpoint);
    const result = await data.json();
    return result.meals;
  } catch (error) {
    console.log(error);
  }
};

const getFoodByArea = async (area) => {
  try {
    const areasEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    const data = await fetch(areasEndpoint);
    const result = await data.json();
    return result.meals;
  } catch (error) {
    console.log(error);
  }
};

const getFoodIngredientThumbnail = async (food) => {
  try {
    const thumbnailEndpoint = `https://www.themealdb.com/images/ingredients/${food}-Small.png`;
    const data = await fetch(thumbnailEndpoint);
    const result = await data.blob();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export {
  getFoodAll,
  getFoodById,
  getRandomFood,
  getFoodByName,
  getFoodByCategory,
  getFoodCategories,
  getFoodByIngredient,
  getFoodByFirstLetter,
  getFoodIngredientsList,
  getFoodAreasList,
  getFoodByArea,
  getFoodIngredientThumbnail,
};
