import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from './testRender';
import ExploreFoods from '../Pages/ExploreFoods';

const oneFood = require('../mocks/oneMeal');

const foodDetails = oneFood.meals[0];

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

describe('Explore Drink teste', () => {
  test('Verifica se a pagina de Explore Drink [e renderizada', () => {
    initial.FoodAndDrinkDetailsReducer.foodDetails = foodDetails;
    const { getByText } = renderWithRouterAndStore(<ExploreFoods />,
      '/explorar/comidas', initial);
    const title = getByText(/Explorar Comidas/i);

    expect(title).toBeInTheDocument();
  });

  test('Verifica se tem dois buttons', () => {
    const { getByText, history } = renderWithRouterAndStore(<ExploreFoods />,
      '/explorar/comidas', initial);
    const buttonI = getByText('Por Ingredientes');
    const buttonS = getByText('Me Surpreenda!');
    const buttonP = getByText('Por Local de Origem');

    expect(buttonI).toBeInTheDocument();
    expect(buttonS).toBeInTheDocument();
    expect(buttonP).toBeInTheDocument();

    fireEvent.click(buttonS);
    expect(history.location.pathname).toBe('/comidas/52771');

    fireEvent.click(buttonI);
    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');

    fireEvent.click(buttonP);
    expect(history.location.pathname).toBe('/explorar/comidas/area');
  });
});
