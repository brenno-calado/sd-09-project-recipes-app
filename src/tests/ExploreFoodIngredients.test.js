import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from './testRender';
import ExploreFoodIngredients from '../Pages/ExploreFoodIngredients';

const fetchI = require('../mocks/mealIngredients');

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(fetchI) }));

describe('Explore Food Ingredients teste', () => {
  test('Verifica se renderizou a pagina de Explore Food', async () => {
    await act(async () => renderWithRouterAndStore(<ExploreFoodIngredients />));

    expect(screen.getByText('Explorar Ingredientes')).toBeInTheDocument();
  });

  test('Verifica se renderiza 12 CARD de ingrediente', async () => {
    await act(async () => renderWithRouterAndStore(<ExploreFoodIngredients />));
    const magicNumber = 12;

    expect(screen.getAllByTestId(/-card-name/g).length).toBe(magicNumber);

    fireEvent.click(screen.getAllByTestId(/-card-img/g)[0]);
  });
});
