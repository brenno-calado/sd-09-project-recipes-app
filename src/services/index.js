const DOMAIN_MEAL = 'https://www.themealdb.com/';
const DOMAIN_COCKTAIL = 'https://www.thecocktaildb.com/';

const types = {
  food: DOMAIN_MEAL,
  cocktail: DOMAIN_COCKTAIL,
};

const selectors = {
  ingredient: 'api/json/v1/1/filter.php?i=',
  categorie: 'api/json/v1/1/filter.php?c=',
  area: 'api/json/v1/1/filter.php?a=',
  name: 'api/json/v1/1/search.php?s=',
  letters: 'api/json/v1/1/search.php?f=',
  image: 'images/ingredients/',

  categoriesList: 'api/json/v1/1/list.php?c=list',
  areasList: 'api/json/v1/1/list.php?a=list',
  ingredientsList: 'api/json/v1/1/list.php?i=list',

  details: 'api/json/v1/1/lookup.php?i=',

  random: 'api/json/v1/1/random.php',
};

const fetchApi = async (type, selector, endPoint) => {
  try {
    const request = await fetch(types[type] + selectors[selector] + endPoint);
    const response = await request.json();
    return (response);
  } catch (error) {
    console.log(error);
  }
};

export default fetchApi;
