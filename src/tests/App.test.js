import React from 'react';
import { renderWithRouterAndStore } from './testRender';
import App from '../App';

describe('App teste', () => {
  test('Verifica se renderizou a pagina de App', () => {
    const { getByText } = renderWithRouterAndStore(<App />);
    const title = getByText(/TRYBE/i);

    expect(title).toBeInTheDocument();
  });
});
