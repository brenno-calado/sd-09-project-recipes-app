const MEAL_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEAL_BY_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const MEAL_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const MEAL_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const MEAL_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const MEAL_BY_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

export default {
  async fetchByArea(area) {
    try {
      const recipesHTTP = await fetch(`${MEAL_BY_AREA}${area}`);
      if (recipesHTTP.ok) {
        const recipesJSON = await recipesHTTP.json();
        return recipesJSON.meals;
      }
      throw new Error('Falha ao buscar receitas por região =(');
    } catch (error) {
      return { message: error.message };
    }
  },

  async fetchByName(name) {
    try {
      const recipesHTTP = await fetch(`${MEAL_BY_NAME}${name}`);
      if (recipesHTTP.ok) {
        const recipesJSON = await recipesHTTP.json();
        return recipesJSON.meals;
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
      const recipesHTTP = await fetch(`${MEAL_BY_FIRST_LETTER}${firstLetter}`);
      if (recipesHTTP.ok) {
        const recipesJSON = await recipesHTTP.json();
        return recipesJSON.meals;
      }
      throw new Error('Falha ao buscar receitas pela primeria letra =(');
    } catch (error) {
      return { message: error.message };
    }
  },

  async fetchByIngredient(ingredient) {
    try {
      const recipesHTTP = await fetch(`${MEAL_BY_INGREDIENT}${ingredient}`);
      if (recipesHTTP.ok) {
        const recipesJSON = await recipesHTTP.json();
        return recipesJSON.meals;
      }
      throw new Error('Falha ao buscar receitas por ingrediente =(');
    } catch (error) {
      return { message: error.message };
    }
  },

  async fetchByCategory(category) {
    try {
      const recipesHTTP = await fetch(`${MEAL_BY_CATEGORY}${category}`);
      if (recipesHTTP.ok) {
        const recipesJSON = await recipesHTTP.json();
        return recipesJSON.meals;
      }
      throw new Error('Falha ao buscar receitas por categoria =(');
    } catch (error) {
      return { message: error.message };
    }
  },

  async fecthByID(id) {
    try {
      const recipesHTTP = await fetch(`${MEAL_BY_ID}${id}`);
      if (recipesHTTP.ok) {
        const recipesJSON = await recipesHTTP.json();
        return recipesJSON.meals[0];
      }
      throw new Error('Falha ao buscar receitas por ID =(');
    } catch (error) {
      return { message: error.message };
    }
  },
};
