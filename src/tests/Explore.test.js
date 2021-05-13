import React from 'react';
import { renderWithRouterAndStore } from './testRender';
import Explore from '../Pages/Explore';

describe('Explore teste', () => {
  test('Verifica se renderizou a pagina de Explore', () => {
    const { getByText } = renderWithRouterAndStore(<Explore />);
    const title = getByText('Explorar');

    expect(title).toBeInTheDocument();
  });
});
