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
  console.log(response);
  return response;
};

export const getMealsCatergories = async (url) => {
  const request = await fetch(`${URLBASE[url]}/list.php?c=list`)
    .then((response) => response.json());
  console.log(url);
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
