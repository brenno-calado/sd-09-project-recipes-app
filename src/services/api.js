const URLBASE = {
  comidas: 'https://www.themealdb.com/api/json/v1/1',
  bebidas: 'https://www.thecocktaildb.com/api/json/v1/1',
};

export default async (mealtype, query, filter) => {
  let request = '';

  if (query && (filter === 'primeira-letra')) {
    if (query.length === 1) {
      request = await fetch(`${URLBASE[mealtype]}/search.php?f=${query}`);
    } else {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
  } else if (query && (filter === 'ingrediente')) {
    request = await fetch(`${URLBASE[mealtype]}/filter.php?i=${query}`);
  } else if (query && (filter === 'nome')) {
    request = await fetch(`${URLBASE[mealtype]}/search.php?s=${query}`);
  }

  const response = await request.json();
  return response;
};
