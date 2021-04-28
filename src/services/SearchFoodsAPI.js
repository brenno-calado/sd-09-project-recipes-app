// const URLIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
// const URLName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// const URLFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export const ingredientAPI = async (term) => {
  const myRecipes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`)
    .then((response) => response.json())
    .then((myMeals) => myMeals.meals);
  return myRecipes;
};

const nameAPI = async (term) => {
  const myRecipes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then((response) => response.json())
    .then((myMeals) => myMeals.meals);
  return myRecipes;
};

const firstLetterAPI = async (term) => {
  const myRecipes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    .then((response) => response.json())
    .then((myMeals) => myMeals.meals);
  return myRecipes;
};

const SearchFoodsAPI = async (type, term) => {
  if (type === 'ingredient') {
    return ingredientAPI(term);
  }
  if (type === 'name') {
    return nameAPI(term);
  }
  if (type === 'first-letter') {
    if (term.length === 1) {
      return firstLetterAPI(term);
    }
    if (term.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }
};

export default SearchFoodsAPI;
