import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from './testRender';
import ExploreOrigin from '../Pages/ExploreOrigin';

const exploreAreas = require('../mocks/areas');
const italianMeals = require('../mocks/italianMeals');

const initial = {
  FoodAndDrinkReducer: {
    food: [],
    filterFood: [],
    filterOrigin: [],
    foodName: '',
    foodBoolean: false,
    drinks: [],
    filterDrinks: [],
    drinkName: '',
    drinkBoolean: false,
    searchBar: false,
    searchBoolean: false,
    ingredient: '',
  },
  FoodAndDrinkDetailsReducer: { foodDetails: {}, drinkDetails: {} },
  ButtonReducer: {
    doneRecipes: [''],
    favoriteRecipes: [''],
    inProgressRecipes: { cocktails: {}, meals: {} },
  },
};

describe('Explore Food Area teste', () => {
  test('Verifica se a pagina de Explore Food Area [e renderizada', () => {
    const { getByText } = renderWithRouterAndStore(<ExploreOrigin />);
    const title = getByText('Explorar Origem');

    expect(title).toBeInTheDocument();
  });

  test('Verifica se tem o filtro por Origem', () => {
    const magicNumberFilter = 13;
    initial.FoodAndDrinkReducer.filterOrigin = exploreAreas.meals;
    const { getAllByTestId } = renderWithRouterAndStore(<ExploreOrigin />,
      '/explore/comidas/area', initial);
    const allOrigin = getAllByTestId(/-option/g);

    expect(allOrigin.length).toBe(magicNumberFilter);
  });

  test('Verficia se o filtro muda para Italian', () => {
    const magicNumber = 12;
    initial.FoodAndDrinkReducer.filterOrigin = exploreAreas.meals;
    initial.FoodAndDrinkReducer.food = italianMeals.meals.slice(0, magicNumber);
    const { getAllByTestId, getByTestId } = renderWithRouterAndStore(<ExploreOrigin />,
      '/explore/comidas/area', initial);
    const allOrigin = getAllByTestId(/-option/g);
    const selectOrigin = getByTestId('explore-by-area-dropdown');
    const allCards = getAllByTestId(/-recipe-card/g);

    fireEvent.change(selectOrigin, { target: { value: allOrigin[10] } });

    expect(allCards.length).toBe(magicNumber);
    expect(allCards[0].textContent).toBe('Budino Di Ricotta');
  });
});
