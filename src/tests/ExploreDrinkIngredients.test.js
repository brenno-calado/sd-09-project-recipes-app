import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from './testRender';
import ExploreDrinkIngredients from '../Pages/ExploreDrinkIngredients';

const fetchI = require('../mocks/drinkIngredients');

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(fetchI) }));

describe('Explore Drink Ingredients', () => {
  test('Verifica se renderizou a pagina de Explore Drink', async () => {
    await act(async () => renderWithRouterAndStore(<ExploreDrinkIngredients />));

    expect(screen.getByText('Explorar Ingredientes')).toBeInTheDocument();
  });

  test('Verifica se renderiza 12 CARD de ingrediente', async () => {
    await act(async () => renderWithRouterAndStore(<ExploreDrinkIngredients />));
    const magicNumber = 12;

    expect(screen.getAllByTestId(/-card-name/g).length).toBe(magicNumber);

    fireEvent.click(screen.getAllByTestId(/-card-img/g)[0]);
  });
});
