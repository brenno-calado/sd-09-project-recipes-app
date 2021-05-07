import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste componente Header', () => {
  it('Clicar no botão de busca habilita/desabilita a barra', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/comidas');

    const searchButton = screen.getByTestId('search-top-btn');

    userEvent.click(searchButton);

    const searchBar = screen.getByTestId('search-input');

    expect(searchBar).toBeInTheDocument();
  });
});
