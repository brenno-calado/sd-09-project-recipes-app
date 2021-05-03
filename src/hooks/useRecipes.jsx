import mealsAPI from '../services/mealsAPI';
import cocktailsAPI from '../services/cocktailsAPI';

export default function useRecipes() {
  function getMealsRecipes(searchInput, criteria) {
    switch (criteria) {
    case 'ingredient':
      return mealsAPI.fetchByIngredient(searchInput);
    case 'name':
      return mealsAPI.fetchByName(searchInput);
    case 'firstLetter':
      return mealsAPI.fetchByFirstLetter(searchInput);
    case 'category':
      return mealsAPI.fetchByCategory(searchInput);
    default:
      return [];
    }
  }

  function getCocktailsRecipes(searchInput, criteria) {
    switch (criteria) {
    case 'ingredient':
      return cocktailsAPI.fetchByIngredient(searchInput);
    case 'name':
      return cocktailsAPI.fetchByName(searchInput);
    case 'firstLetter':
      return cocktailsAPI.fetchByFirstLetter(searchInput);
    case 'category':
      return cocktailsAPI.fetchByCategory(searchInput);
    default:
      return [];
    }
  }

  function getRecipes(category, searchInput, criteria) {
    if (category === 'comidas') {
      return getMealsRecipes(searchInput, criteria);
    }
    return getCocktailsRecipes(searchInput, criteria);
  }

  return { getRecipes };
}
