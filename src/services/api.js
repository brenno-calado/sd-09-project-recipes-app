const URLBASE = {
  comidas: 'https://www.themealdb.com/api/json/v1/1',
  bebidas: 'https://www.thecocktaildb.com/api/json/v1/1',
};

export default async (mealtype) => {
  const request = await fetch(`${URLBASE[mealtype]}/search.php?s=`);
  const response = await request.json();
  return response;
};

export const getFilteredRecipes = async (mealtype, query, filter) => {
  let request = '';

  if (query && (filter === 'primeira-letra')) {
    if (query.length === 1) {
      request = await fetch(`${URLBASE[mealtype]}/search.php?f=${query}`);
    }
  } else if (query && (filter === 'ingrediente')) {
    request = await fetch(`${URLBASE[mealtype]}/filter.php?i=${query}`);
  } else if (query && (filter === 'nome')) {
    request = await fetch(`${URLBASE[mealtype]}/search.php?s=${query}`);
  }

  const response = await request.json();
  return response;
};

export async function requestByIngredient(ingredient) {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const response = request.json();
  return response;
}

export async function requestByIngredientDrink(ingredient) {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const response = request.json();
  return response;
}

export async function requestByArea() {
  const requestAreas = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json());
  return requestAreas.meals;
}

export async function requestRecipes() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json());
  return request.meals;
}
export const getMealsCatergories = async (url) => {
  const request = await fetch(`${URLBASE[url]}/list.php?c=list`)
    .then((response) => response.json());
  if (url === 'comidas') {
    const { meals } = request;
    return meals;
  }
  const { drinks } = request;
  return drinks;
};

export const getRecipesByCategories = (url, category) => {
  const request = fetch(`${URLBASE[url]}/filter.php?c=${category}`)
    .then((response) => response.json()
      .then((data) => data));
  return request;
};
