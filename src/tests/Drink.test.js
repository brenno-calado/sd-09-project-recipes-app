import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drinks from '../Pages/Drinks';
import { renderWithRouterAndStore } from './testRender';

const drinksMock = require('../mocks/drinks');
const ordinaryDrinksMock = require('../mocks/ordinaryDrinks');
const drinkCategoriesMock = require('../mocks/drinkCategories');
const drinksByIngredient = require('../mocks/drinksByIngredient');
const oneDrink = require('../mocks/oneDrink');

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

describe('Drink teste', () => {
  test('Verifica se a pagina de Drink [e renderizada', () => {
    const { getByText } = renderWithRouterAndStore(<Drinks />);
    const title = getByText(/Bebidas/i);

    expect(title).toBeInTheDocument();
  });

  test('Verifica se tem todos os filtros', () => {
    const magicNumberFilter = 5;
    const magicNumber = 6;
    initial.FoodAndDrinkReducer
      .filterDrinks = drinkCategoriesMock.drinks.slice(0, magicNumberFilter);
    const { getAllByTestId } = renderWithRouterAndStore(<Drinks />, '/bebidas', initial);
    const allFilter = getAllByTestId(/category-filter/i);
    expect(allFilter.length).toBe(magicNumber);
  });

  test('Verifica se tem 12 CARDS', () => {
    const magicNumber = 12;
    initial.FoodAndDrinkReducer.drinks = drinksMock.drinks.slice(0, magicNumber);
    const { getAllByTestId } = renderWithRouterAndStore(<Drinks />, '/bebidas', initial);
    const allCards = getAllByTestId(/-recipe-card/i);
    expect(allCards.length).toBe(magicNumber);
  });

  test('Verifica se tem 12 CARDS quando clica no button ALL', () => {
    const magicNumber = 12;
    const { getByTestId,
      getAllByTestId } = renderWithRouterAndStore(<Drinks />, '/bebidas', initial);
    const buttonAll = getByTestId('All-category-filter');

    fireEvent.click(buttonAll);

    const allCards = getAllByTestId(/-recipe-card/i);
    expect(allCards.length).toBe(magicNumber);
  });

  test('Verifica se tem 12 CARDS com o ingrediente', () => {
    const magicNumber = 12;
    initial.FoodAndDrinkReducer.ingredient = 'Light rum';
    initial.FoodAndDrinkReducer.drinks = drinksByIngredient.drinks.slice(0, magicNumber);
    const { getAllByTestId } = renderWithRouterAndStore(<Drinks />, '/bebidas', initial);
    const allCards = getAllByTestId(/-recipe-card/i);

    expect(allCards.length).toBe(magicNumber);
  });

  test('Verifica se tem 12 CARDS quando clica no filtro', () => {
    const magicNumber = 12;
    initial.FoodAndDrinkReducer.drinks = ordinaryDrinksMock.drinks.slice(0, magicNumber);
    const { getByTestId,
      getAllByTestId } = renderWithRouterAndStore(<Drinks />, '/bebidas', initial);
    const buttonOrdinaryD = getByTestId('Ordinary Drink-category-filter');

    fireEvent.click(buttonOrdinaryD);

    const allCards = getAllByTestId(/-recipe-card/i);
    expect(allCards.length).toBe(magicNumber);
  });

  test('Verifica se tiver 1 CARD, redirect para pagina de detalhe', () => {
    initial.FoodAndDrinkReducer.searchBoolean = true;
    initial.FoodAndDrinkReducer.drinks = oneDrink.drinks;
    const { history } = renderWithRouterAndStore(<Drinks />, '/bebidas', initial);

    expect(history.location.pathname).toBe('/bebidas/178319');
  });
});

describe('Header test', () => {
  const textSearchTop = 'search-top-btn';
  const textSearchInput = 'search-input';
  const textFirstLetter = 'first-letter-search-radio';
  const execButton = 'exec-search-btn';

  test('Verifica se renderizou o SearchBar', () => {
    const { getByTestId } = renderWithRouterAndStore(<Drinks />);
    const searchBar = getByTestId(textSearchTop);

    expect(searchBar).toBeInTheDocument();

    fireEvent.click(searchBar);

    const searchInput = getByTestId(textSearchInput);
    const searchIngredient = getByTestId('ingredient-search-radio');
    const searchName = getByTestId('name-search-radio');
    const searchFirstLetter = getByTestId(textFirstLetter);
    const searchButton = getByTestId(execButton);

    expect(searchIngredient).toBeInTheDocument();
    expect(searchName).toBeInTheDocument();
    expect(searchFirstLetter).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('Verifica se ta pesquisando por ingredients', () => {
    const { getByTestId } = renderWithRouterAndStore(<Drinks />);
    const searchBar = getByTestId(textSearchTop);

    fireEvent.click(searchBar);

    const searchIngredient = getByTestId('ingredient-search-radio');
    const searchInput = getByTestId(textSearchInput);
    const searchButton = getByTestId(execButton);

    fireEvent.click(searchIngredient);
    userEvent.type(searchInput, 'Gin');
    fireEvent.click(searchButton);
  });

  test('Verifica se ta pesquisando por nome', () => {
    const { getByTestId } = renderWithRouterAndStore(<Drinks />);
    const searchBar = getByTestId(textSearchTop);

    fireEvent.click(searchBar);

    const searchFirstLetter = getByTestId('name-search-radio');
    const searchInput = getByTestId(textSearchInput);
    const searchButton = getByTestId(execButton);

    fireEvent.click(searchFirstLetter);
    userEvent.type(searchInput, 'Aquamarine');
    fireEvent.click(searchButton);
  });

  test('Verifica se ta pesquisando por uma letra', () => {
    const { getByTestId } = renderWithRouterAndStore(<Drinks />);
    const searchBar = getByTestId(textSearchTop);

    fireEvent.click(searchBar);

    const searchFirstLetter = getByTestId(textFirstLetter);
    const searchInput = getByTestId(textSearchInput);
    const searchButton = getByTestId(execButton);

    fireEvent.click(searchFirstLetter);
    userEvent.type(searchInput, 'A');
    fireEvent.click(searchButton);
  });

  // test('Verifica se nao esta pesquisando por uma letra', () => {
  //   const { getByTestId } = renderWithRouterAndStore(<Drinks />);
  //   const searchBar = getByTestId(textSearchTop);

  //   fireEvent.click(searchBar);

  //   const searchFirstLetter = getByTestId(textFirstLetter);
  //   const searchInput = getByTestId(textSearchInput);
  //   const searchButton = getByTestId(execButton);

  //   fireEvent.click(searchFirstLetter);
  //   userEvent.type(searchInput, 'AA');
  //   fireEvent.click(searchButton);
  // });
});
