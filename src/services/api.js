export async function fetchMeal(filters) {
  const { inputSearch, ingrediente, nome, primeiraLetra } = filters;
  let req = '';
  let response = [];
  if (ingrediente) {
    req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
    const { meals } = await req.json();
    response = meals;
  }
  if (nome) {
    req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`);
    const { meals } = await req.json();
    response = meals;
  }
  if (primeiraLetra) {
    if (inputSearch.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`);
    const { meals } = await req.json();
    response = meals;
  }
  return response;
}

export async function fetchDrink(filters) {
  const { inputSearch, ingrediente, nome, primeiraLetra } = filters;
  let req = '';
  let response = [];
  if (ingrediente) {
    req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${inputSearch}`);
    const { drinks } = await req.json();
    response = drinks;
  }
  if (nome) {
    req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`);
    const { drinks } = await req.json();
    response = drinks;
  }
  if (primeiraLetra) {
    if (inputSearch.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`);
    const { drinks } = await req.json();
    response = drinks;
  }
  return response;
}

export async function fetchOneMeal(id) {
  const req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await req.json();
  return meals;
}

export async function fetchOneDrink(id) {
  const req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await req.json();
  return drinks;
}

export async function fetchMealsAcompaniments() {
  const req = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await req.json();
  return drinks;
}

export async function fetchDrinksAcompaniments() {
  const req = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await req.json();
  return meals;
}
