const COCKTAIL_BY_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const COCKTAIL_BY_FIRST_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const COCKTAIL_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const COCKTAIL_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const COCKTAIL_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const formatIngredients = (details) => Object.keys(details)
  .filter((key) => key.includes('Ingredient') && details[key])
  .map((key) => {
    const ingredientID = key.split('strIngredient')[1];
    return `${details[key]} - ${details[`strMeasure${ingredientID}`]}`;
  });

const formatObj = (obj) => ({
  id: obj.idDrink,
  type: 'bebida',
  area: '',
  category: obj.strCategory,
  alcoholicOrNot: obj.strAlcoholic,
  name: obj.strDrink,
  image: obj.strDrinkThumb,
  instructions: obj.strInstructions,
  video: obj.strYoutube,
  ingredients: formatIngredients(obj),
});

export default {
  async fetchByName(name) {
    try {
      const recipesHTTP = await fetch(`${COCKTAIL_BY_NAME}${name}`);
      if (recipesHTTP.ok) {
        const recipesJSON = await recipesHTTP.json();
        return !recipesJSON.drinks
          ? recipesJSON.drinks
          : recipesJSON.drinks.map((recipe) => formatObj(recipe));
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
        return !recipesJSON.drinks
          ? recipesJSON.drinks
          : recipesJSON.drinks.map((recipe) => formatObj(recipe));
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
        return !recipesJSON.drinks
          ? recipesJSON.drinks
          : recipesJSON.drinks.map((recipe) => formatObj(recipe));
      }
      throw new Error('Falha ao buscar receitas por ingrediente =(');
    } catch (error) {
      return { message: error.message };
    }
  },

  async fetchByCategory(category) {
    try {
      const recipesHTTP = await fetch(`${COCKTAIL_BY_CATEGORY}${category}`);
      if (recipesHTTP.ok) {
        const recipesJSON = await recipesHTTP.json();
        return !recipesJSON.drinks
          ? recipesJSON.drinks
          : recipesJSON.drinks.map((recipe) => formatObj(recipe));
      }
      throw new Error('Falha ao buscar receitas por categoria =(');
    } catch (error) {
      return { message: error.message };
    }
  },

  async fetchByID(id) {
    try {
      const recipesHTTP = await fetch(`${COCKTAIL_BY_ID}${id}`);
      if (recipesHTTP.ok) {
        const recipesJSON = await recipesHTTP.json();
        return !recipesJSON.drinks
          ? recipesJSON.drinks
          : recipesJSON.drinks.map((recipe) => formatObj(recipe))[0];
      }
      throw new Error('Falha ao buscar receitas por ID =(');
    } catch (error) {
      return { message: error.message };
    }
  },
};
