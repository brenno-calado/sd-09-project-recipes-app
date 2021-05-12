import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from './testRender';
import FavoriteRecipes from '../Pages/FavoriteRecipes';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

describe('Receitas Favoritas teste', () => {
  test('Verifica se renderizou a pagina de Receitas Favoritas', () => {
    const { getByText } = renderWithRouterAndStore(<FavoriteRecipes />);
    const title = getByText('Receitas Favoritas');

    expect(title).toBeInTheDocument();
  });

  test('Verifica se renderiza duas receita', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { getAllByTestId } = renderWithRouterAndStore(<FavoriteRecipes />);

    const allCard = getAllByTestId(/-horizontal-name/i);

    expect(allCard.length).toBe(2);
  });

  test('Verifica se os filtros estao funcionando', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { getAllByTestId, getByTestId } = renderWithRouterAndStore(<FavoriteRecipes />);

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

  test('Verfica se o Card saiu dos favoritos', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { getAllByTestId } = renderWithRouterAndStore(<FavoriteRecipes />);

    const heartButton = getAllByTestId(/-horizontal-favorite-btn/g);

    fireEvent.click(heartButton[0]);
  });
});
