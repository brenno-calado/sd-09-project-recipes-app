import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from './testRender';
import DrinkDetails from '../Pages/DrinkDetails';

const oneDrink = require('../mocks/oneDrink');
const mealsMock = require('../mocks/meals');

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

const inProgressRecipes = {
  cocktails: {
    178319: [],
  },
  meals: {},
};

const doneRecipes = [
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Drinks Details teste', () => {
  const route = '/bebidas/178319';

  test('Verifica se renderizou a pagina de Drinks Details', () => {
    const { getByText } = renderWithRouterAndStore(<DrinkDetails
      match={ { params: { id: 178319 } } }
    />);
    const titleIngredients = getByText('Ingredients');

    expect(titleIngredients).toBeInTheDocument();
  });

  test('Verifica se renderizou a pagina de Carousel Drink', () => {
    const magicNumber = 12;
    initial.FoodAndDrinkDetailsReducer.drinkDetails = drinkDetails;
    initial.FoodAndDrinkReducer.food = mealsMock.meals.slice(0, magicNumber);
    const { getByText } = renderWithRouterAndStore(<DrinkDetails
      match={ { params: { id: 178319 } } }
    />, route, initial);
    const titleIngredients = getByText('Iniciar Receita');

    expect(titleIngredients).toBeInTheDocument();
  });

  test('Verifica se renderizou o button de Continuar Receita', () => {
    const magicNumber = 12;
    initial.FoodAndDrinkDetailsReducer.drinkDetails = drinkDetails;
    initial.FoodAndDrinkReducer.food = mealsMock.meals.slice(0, magicNumber);
    initial.ButtonReducer.inProgressRecipes = inProgressRecipes;
    const { getByText } = renderWithRouterAndStore(<DrinkDetails
      match={ { params: { id: 178319 } } }
    />, route, initial);
    const buttonFinal = getByText('Continuar Receita');

    expect(buttonFinal).toBeInTheDocument();
  });

  test('Verifica se nao renderizou o button de Iniciar Receita', () => {
    const magicNumber = 12;
    initial.FoodAndDrinkDetailsReducer.drinkDetails = drinkDetails;
    initial.FoodAndDrinkReducer.food = mealsMock.meals.slice(0, magicNumber);
    initial.ButtonReducer.doneRecipes = doneRecipes;
    const { getByTestId } = renderWithRouterAndStore(<DrinkDetails
      match={ { params: { id: 178319 } } }
    />, route, initial);
    const buttonFinal = getByTestId('start-recipe-btn');

    expect(buttonFinal).toBeInTheDocument();
  });
});

describe('Card Details Test', () => {
  const route = '/bebidas/178319';

  test('Verifica se esta funcionando button Curtir', () => {
    const { getByTestId } = renderWithRouterAndStore(<DrinkDetails
      match={ { params: { id: 178319 } } }
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
