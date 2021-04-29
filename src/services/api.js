const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export default async (query, filter) => {
  let request = '';

  if (query && (filter === 'primeira-letra')) {
    if (query.length === 1) {
      request = await fetch(`${BASE_URL}/search.php?f=${query}`);
    } else {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
  } else if (query && (filter === 'ingrediente')) {
    request = await fetch(`${BASE_URL}/filter.php?i=${query}`);
  } else if (query && (filter === 'nome')) {
    request = await fetch(`${BASE_URL}/search.php?s=${query}`);
  }

  const response = await request.json();
  console.log(response);
  return response;
};
