const COCKTAIL_BY_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const COCKTAIL_BY_FIRST_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const COCKTAIL_BY_INGREDIENT = 'https://https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

export default {
  async fetchByName(name) {
    try {
      const recipesHTTP = await fetch(`${COCKTAIL_BY_NAME}${name}`);
      if (recipesHTTP.ok) {
        const recipesJSON = await recipesHTTP.json();
        return recipesJSON.drinks;
      }
      throw new Error('Falha ao buscar receitas por nome =(');
    } catch (error) {
      return { message: error.message };
    }
  },

  async fetchByFirstLetter(firstLetter) {
    try {
      if (firstLetter.length > 1) {
        throw new Error('Sua busca deve conter somente 1 (um) caracter');
      }
      const recipesHTTP = await fetch(`${COCKTAIL_BY_FIRST_LETTER}${firstLetter}`);
      if (recipesHTTP.ok) {
        const recipesJSON = await recipesHTTP.json();
        return recipesJSON.drinks;
      }
      throw new Error('Falha ao buscar receitas pela primeria letra =(');
    } catch (error) {
      return { message: error.message };
    }
  },

  async fetchByIngredient(ingredient) {
    try {
      const recipesHTTP = await fetch(`${COCKTAIL_BY_INGREDIENT}${ingredient}`);
      if (recipesHTTP.ok) {
        const recipesJSON = await recipesHTTP.json();
        return recipesJSON.drinks;
      }
      throw new Error('Falha ao buscar receitas por ingrediente =(');
    } catch (error) {
      return { message: error.message };
    }
  },
};
