import React from 'react';
import { fireEvent } from '@testing-library/react';
import Food from '../Pages/Food';
import { renderWithRouterAndStore } from './testRender';

const mealsMock = require('../mocks/meals');
const goatMealsMock = require('../mocks/goatMeals');
const mealCategoriesMock = require('../mocks/mealCategories');
const mealByIngredient = require('../mocks/mealsByIngredient');
const oneMeal = require('../mocks/oneMeal');

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

describe('Food teste', () => {
  test('Verifica se a pagina de Food [e renderizada', () => {
    const { getByText } = renderWithRouterAndStore(<Food />);
    const title = getByText(/Comidas/i);

    expect(title).toBeInTheDocument();
  });

  test('Verifica se tem todos os filtros', () => {
    const magicNumberFilter = 5;
    const magicNumber = 6;
    initial.FoodAndDrinkReducer
      .filterFood = mealCategoriesMock.meals.slice(0, magicNumberFilter);
    const { getAllByTestId } = renderWithRouterAndStore(<Food />, '/comidas', initial);
    const allFilter = getAllByTestId(/category-filter/i);
    expect(allFilter.length).toBe(magicNumber);
  });

  test('Verifica se tem 12 CARDS', () => {
    const magicNumber = 12;
    initial.FoodAndDrinkReducer.food = mealsMock.meals.slice(0, magicNumber);
    const { getAllByTestId } = renderWithRouterAndStore(<Food />, '/comidas', initial);
    const allCards = getAllByTestId(/-recipe-card/i);
    expect(allCards.length).toBe(magicNumber);
  });

  test('Verifica se tem 12 CARDS quando clica no button ALL', () => {
    const magicNumber = 12;
    const { getByTestId,
      getAllByTestId } = renderWithRouterAndStore(<Food />, '/comidas', initial);
    const buttonAll = getByTestId('All-category-filter');

    fireEvent.click(buttonAll);

    const allCards = getAllByTestId(/-recipe-card/i);
    expect(allCards.length).toBe(magicNumber);
  });

  test('Verifica se tem 12 CARDS com o ingrediente', () => {
    const magicNumber = 10;
    initial.FoodAndDrinkReducer.ingredient = 'Chicken';
    initial.FoodAndDrinkReducer.food = mealByIngredient.meals.slice(0, magicNumber);
    const { getAllByTestId } = renderWithRouterAndStore(<Food />, '/comidas', initial);
    const allCards = getAllByTestId(/-recipe-card/i);

    expect(allCards.length).toBe(magicNumber);
  });

  test('Verifica se tem 12 CARDS quando clica no filtro', () => {
    const magicNumber = 12;
    initial.FoodAndDrinkReducer.food = goatMealsMock.meals.slice(0, magicNumber);
    const { getByTestId,
      getAllByTestId } = renderWithRouterAndStore(<Food />, '/comidas', initial);
    const buttonGoat = getByTestId('Goat-category-filter');

    fireEvent.click(buttonGoat);

    const allCards = getAllByTestId(/-recipe-card/i);
    expect(allCards.length).toBe(1);
  });

  test('Verifica se tiver 1 CARD, redirect para pagina de detalhe', () => {
    initial.FoodAndDrinkReducer.searchBoolean = true;
    initial.FoodAndDrinkReducer.food = oneMeal.meals;
    const { history } = renderWithRouterAndStore(<Food />, '/comidas', initial);

    expect(history.location.pathname).toBe('/comidas/52771');
  });
});
