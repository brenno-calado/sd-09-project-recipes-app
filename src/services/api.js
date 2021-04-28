export async function fetchMeal(filters) {
  const { inputSearch, ingrediente, nome, primeiraLetra } = filters;
  let req = '';
  if (ingrediente) {
    req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
  }
  if (nome) {
    req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`);
  }
  if (primeiraLetra) {
    if (inputSearch.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`);
  }
  const meals = await req.json();
  return meals;
}

export async function fetchDrink(filters) {
  const { inputSearch, ingrediente, nome, primeiraLetra } = filters;
  let req = '';
  if (ingrediente) {
    req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${inputSearch}`);
  }
  if (nome) {
    req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`);
  }
  if (primeiraLetra) {
    if (inputSearch.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`);
  }
  const meals = await req.json();
  return meals;
}
