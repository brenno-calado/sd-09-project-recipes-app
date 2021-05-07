import getFoodsAndDrinks from '../services/servicesAPI';

// Data Meals
import mealsData from './mocks/meals';
import drinksData from './mocks/drinks';

// Constantes
const MAX_FETCH = 25;

const fetchData = (value) => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(value),
  }));
};

beforeEach(() => jest.clearAllMocks());

describe('Página Principal do App', () => {
  it('Requisição para a API TheMealDB e TheCocktailDB pegando as Receitas', async () => {
    fetchData({ meals: [...mealsData] });
    const fetchMeals = await getFoodsAndDrinks('meals', 'getAll');

    expect(fetchMeals).toHaveLength(MAX_FETCH);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

    fetchData({ drinks: [...drinksData] });
    const fetchDrinks = await getFoodsAndDrinks('drinks', 'getAll');

    expect(fetchDrinks).toHaveLength(MAX_FETCH);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
});
