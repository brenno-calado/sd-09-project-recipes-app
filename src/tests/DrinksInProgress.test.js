import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from './testRender';
import DrinkInProgress from '../Pages/DrinkInProgress';

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

// const inProgressRecipes = {
//   cocktails: {
//     178319: [],
//   },
//   meals: {},
// };

describe('Drinks In Progress teste', () => {
  const route = '/bebidas/178319/in-progress';

  test('Verifica se renderizou a pagina de Drinks In Progress', () => {
    const { getByText } = renderWithRouterAndStore(<DrinkInProgress
      match={ { params: { id: 178319 } } }
    />);
    const titleIngredients = getByText('Ingredients');

    expect(titleIngredients).toBeInTheDocument();
  });

  test('Verifica se o button Done habilita', () => {
    initial.FoodAndDrinkDetailsReducer.drinkDetails = drinkDetails;
    const { getByTestId, getAllByTestId } = renderWithRouterAndStore(<DrinkInProgress
      match={ { params: { id: 178319 } } }
    />, route, initial);
    const allChecked = getAllByTestId(/-ingredient-step/i);
    const buttonDone = getByTestId('finish-recipe-btn');

    expect(buttonDone).toBeDisabled();

    allChecked.forEach((checked) => {
      fireEvent.click(checked);
    });

    expect(buttonDone).not.toBeDisabled();

    fireEvent.click(buttonDone);
  });
});
