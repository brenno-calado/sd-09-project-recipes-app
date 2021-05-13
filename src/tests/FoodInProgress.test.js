import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from './testRender';
import FoodInProgress from '../Pages/FoodInProgress';

const oneMeal = require('../mocks/oneMeal');

const foodDetails = oneMeal.meals[0];

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
//   cocktails: {},
//   meals: {
//     52771: [],
//   },
// };

describe('Food In Progress teste', () => {
  const route = '/comidas/52771/in-progress';

  test('Verifica se renderizou a pagina de Food In Progress', () => {
    const { getByText } = renderWithRouterAndStore(<FoodInProgress
      match={ { params: { id: 52771 } } }
    />);
    const titleIngredients = getByText('Ingredients');

    expect(titleIngredients).toBeInTheDocument();
  });

  test('Verifica se o button Done habilita', () => {
    initial.FoodAndDrinkDetailsReducer.foodDetails = foodDetails;
    const { getByTestId, getAllByTestId } = renderWithRouterAndStore(<FoodInProgress
      match={ { params: { id: 52771 } } }
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
