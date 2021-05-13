import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from './testRender';
import FoodDetails from '../Pages/FoodDetails';

const oneMeal = require('../mocks/oneMeal');
const drinksMock = require('../mocks/drinks');

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

const inProgressRecipes = {
  cocktails: {},
  meals: {
    52771: [],
  },
};

const doneRecipes = [{
  id: '52771',
  type: 'comida',
  area: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '22/6/2020',
  tags: ['Pasta', 'Curry'],
}];

describe('Food Details teste', () => {
  const route = '/comidas/52771';

  test('Verifica se renderizou a pagina de Food Details', () => {
    const { getByText } = renderWithRouterAndStore(<FoodDetails
      match={ { params: { id: 52771 } } }
    />);
    const titleIngredients = getByText('Ingredients');

    expect(titleIngredients).toBeInTheDocument();
  });

  test('Verifica se renderizou a pagina de Drinks', () => {
    const magicNumber = 12;
    initial.FoodAndDrinkDetailsReducer.foodDetails = foodDetails;
    initial.FoodAndDrinkReducer.drinks = drinksMock.drinks.slice(0, magicNumber);
    const { getByText } = renderWithRouterAndStore(<FoodDetails
      match={ { params: { id: 52771 } } }
    />, route, initial);
    const titleIngredients = getByText('Ingredients');

    expect(titleIngredients).toBeInTheDocument();
  });

  test('Verifica se renderizou o button de Continuar Receita', () => {
    const magicNumber = 12;
    initial.FoodAndDrinkDetailsReducer.foodDetails = foodDetails;
    initial.FoodAndDrinkReducer.drinks = drinksMock.drinks.slice(0, magicNumber);
    initial.ButtonReducer.inProgressRecipes = inProgressRecipes;
    const { getByText } = renderWithRouterAndStore(<FoodDetails
      match={ { params: { id: 52771 } } }
    />, route, initial);
    const buttonFinal = getByText('Continuar Receita');

    expect(buttonFinal).toBeInTheDocument();
  });

  test('Verifica se nao renderizou o button de Iniciar Receita', () => {
    const magicNumber = 12;
    initial.FoodAndDrinkDetailsReducer.foodDetails = foodDetails;
    initial.FoodAndDrinkReducer.drinks = drinksMock.drinks.slice(0, magicNumber);
    initial.ButtonReducer.doneRecipes = doneRecipes;
    const { getByTestId } = renderWithRouterAndStore(<FoodDetails
      match={ { params: { id: 52771 } } }
    />, route, initial);
    const buttonFinal = getByTestId('start-recipe-btn');

    expect(buttonFinal).toBeInTheDocument();
  });
});

describe('Card Details Test', () => {
  const route = '/comidas/52771';

  test('Verifica se esta funcionando button Curtir', () => {
    const { getByTestId } = renderWithRouterAndStore(<FoodDetails
      match={ { params: { id: 52771 } } }
    />, route, initial);
    const heartButton = getByTestId('favorite-btn');

    fireEvent.click(heartButton);
    expect(heartButton.src).toBe('http://localhost/blackHeartIcon.svg');

    fireEvent.click(heartButton);
    expect(heartButton.src).toBe('http://localhost/whiteHeartIcon.svg');
  });

  // test('Verifica se tem o button SHARE ', () => {
  //   const { getByTestId } = renderWithRouterAndStore(<DrinkDetails
  //     match={ { params: { id: 178319 } } }
  //   />, route, initial);

  //   const buttonShare = getByTestId('share-btn');

  //   fireEvent.click(buttonShare);
  // });
});
