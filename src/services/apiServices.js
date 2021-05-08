export const getRecipe = (id, typeRecipe) => {
  const url = () => {
    switch (typeRecipe) {
    case 'meals':
      return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    case 'drinks':
      return `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    default: break;
    }
  };
  return fetch(url())
    .then((response) => response.json()
      .then((data) => data[typeRecipe][0]));
};

export const getDefaultRecipes = (typeRecipe) => {
  const url = () => {
    switch (typeRecipe) {
    case 'meals':
      return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    case 'drinks':
      return 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    default: break;
    }
  };
  return fetch(url())
    .then((response) => response.json()
      .then((data) => data[typeRecipe]));
};
