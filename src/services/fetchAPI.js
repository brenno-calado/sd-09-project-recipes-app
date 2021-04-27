export const fetchFoods = async (data, searchValue) => {
  let url = '';
  switch (data) {
  case 'ingredient':
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`;
    break;
  case 'name':
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    break;
  case 'letter':
    if (searchValue.length === 1) {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`;
    } else {
      window.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    break;
  default:
    console.log('default');
  }
  const fetchData = await fetch(url);
  const result = await fetchData.json();
  return result;
};

export const fetchDrinks = async (data, searchValue) => {
  let url = '';
  switch (data) {
  case 'ingredient':
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`;
    break;
  case 'name':
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
    break;
  case 'letter':
    if (searchValue.length === 1) {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchValue}`;
    } else {
      window.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    break;
  default:
    console.log('default');
  }
  const fetchData = await fetch(url);
  const result = await fetchData.json();
  return result;
};
