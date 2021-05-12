import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from './testRender';
import DoneRecipes from '../Pages/DoneRecipes';

const doneRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
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

describe('Receitas Feitas teste', () => {
  test('Verifica se a pagina de Receitas Feitas [e renderizada', () => {
    const { getByText } = renderWithRouterAndStore(<DoneRecipes />);
    const title = getByText(/Receitas Feitas/i);

    expect(title).toBeInTheDocument();
  });

  test('Verifica se renderiza duas receita', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { getAllByTestId } = renderWithRouterAndStore(<DoneRecipes />);

    const allCard = getAllByTestId(/-horizontal-name/i);

    expect(allCard.length).toBe(2);
  });

  test('Verifica se os filtros estao funcionando', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { getAllByTestId, getByTestId } = renderWithRouterAndStore(<DoneRecipes />);

    const buttonAll = getByTestId('filter-by-all-btn');
    const buttonFood = getByTestId('filter-by-food-btn');
    const buttonDrink = getByTestId('filter-by-drink-btn');

    const allCard = getAllByTestId(/-horizontal-name/i);

    fireEvent.click(buttonAll);
    expect(allCard.length).toBe(2);

    fireEvent.click(buttonFood);
    const CardFood = getAllByTestId(/-horizontal-name/i);
    expect(CardFood.length).toBe(1);

    fireEvent.click(buttonDrink);
    const CardDrink = getAllByTestId(/-horizontal-name/i);
    expect(CardDrink.length).toBe(1);
  });

  // test('Verifica se tem o button SHARE ', () => {
  //   localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  //   const { getAllByAltText } = renderWithRouterAndStore(<DoneRecipes />);

  //   const buttonShare = getAllByAltText('share');

  //   fireEvent.click(buttonShare[0]);
  // });
});
