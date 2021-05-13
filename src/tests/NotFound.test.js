import React from 'react';
import { renderWithRouterAndStore } from './testRender';
import NotFound from '../Pages/NotFound';

describe('Not Found teste', () => {
  test('Verifica se renderizou a pagina de NotFound', () => {
    const { getByText } = renderWithRouterAndStore(<NotFound />);
    const title = getByText(/Not Found/i);

    expect(title).toBeInTheDocument();
  });
});
