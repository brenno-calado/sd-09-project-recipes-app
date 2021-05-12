import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from './testRender';
import ExploreDrinks from '../Pages/ExploreDrinks';

const oneDrink = require('../mocks/oneDrink');

const drinkDetails = oneDrink.drinks[0];

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
    initial.FoodAndDrinkDetailsReducer.drinkDetails = drinkDetails;
    const { getByText } = renderWithRouterAndStore(<ExploreDrinks />,
      '/explorar/bebidas', initial);
    const title = getByText(/Explorar Bebidas/i);

    expect(title).toBeInTheDocument();
  });

  test('Verifica se tem dois buttons', () => {
    const { getByText, history } = renderWithRouterAndStore(<ExploreDrinks />,
      '/explorar/bebidas', initial);
    const buttonI = getByText('Por Ingredientes');
    const buttonS = getByText('Me Surpreenda!');

    expect(buttonI).toBeInTheDocument();
    expect(buttonS).toBeInTheDocument();

    fireEvent.click(buttonS);
    expect(history.location.pathname).toBe('/bebidas/178319');

    fireEvent.click(buttonI);
    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });
});
