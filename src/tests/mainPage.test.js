import React from 'react';
import renderWithRouter from './renderWithRouter';
import getFoodsAndDrinks from '../services/servicesAPI';

// Pages
import MainPage from '../pages/mainPage';

// Actions
import {
  listMeals,
  categoriesMeals,
} from '../actions';

// Data Meals
import mealsData from './mocks/meals';
import drinksData from './mocks/drinks';
import {
  categoriesMealsData,
  categoriesDrinksData,
} from './mocks/categories';

// Constantes
const MAX_FETCH = 25;
const MAX_CATEGORIES_MEALS = 14;
const MAX_CATEGORIES_DRINKS = 11;

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

  it('Requisição para a API TheMealDB e TheCocktailDB pegando as Categorias',
    async () => {
      fetchData({ meals: [...categoriesMealsData] });
      const fetchMeals = await getFoodsAndDrinks('meals', 'getByCategory');

      expect(fetchMeals).toHaveLength(MAX_CATEGORIES_MEALS);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

      fetchData({ drinks: [...categoriesDrinksData] });
      const fetchDrinks = await getFoodsAndDrinks('drinks', 'getByCategory');

      expect(fetchDrinks).toHaveLength(MAX_CATEGORIES_DRINKS);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    });

  it('Verifica se o STORE contém as informações das API de Comida', async () => {
    fetchData({ meals: [...mealsData] });
    const fetchMeals = await getFoodsAndDrinks('meals', 'getAll');
    const { dispatch, getState } = renderWithRouter(<MainPage />, { route: '/comidas' });

    dispatch(listMeals(fetchMeals));
    dispatch(categoriesMeals(categoriesMealsData));

    expect(getState().recipesReducer.meals).toHaveLength(MAX_FETCH);
    expect(getState().recipesReducer.categoriesMeals).toHaveLength(MAX_CATEGORIES_MEALS);
  });
});
