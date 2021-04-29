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
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
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
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }
  const fetchData = await fetch(url);
  const result = await fetchData.json();
  return result;
};

export const fetchFoodsDetails = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const fetchData = await fetch(url);
  const result = await fetchData.json();
  return result;
};

export const fetchDrinksDetails = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const fetchData = await fetch(url);
  const result = await fetchData.json();
  return result;
};

export const fetchFoodsRecomendation = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const fetchData = await fetch(url);
  const { meals } = await fetchData.json();
  const returnNumber = 6;
  const resultFinal = meals.filter((_, index) => index < returnNumber);
  return resultFinal;
};

export const fetchDrinksRecomendation = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const fetchData = await fetch(url);
  const { drinks } = await fetchData.json();
  const returnNumber = 6;
  const resultFinal = drinks.filter((_, index) => index < returnNumber);
  return resultFinal;
};