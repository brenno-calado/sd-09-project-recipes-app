import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { MainFoods } from '../pages';
import userEvent from '@testing-library/user-event';

describe('Testing <SearchBar /> functionality', () => {
  it('should show / hide the search bar', () => {
    const { getByTestId, queryByRole, queryByLabelText } = renderWithRouter(<MainFoods />);

    expect(queryByRole('textbox')).toBe(null);
    expect(queryByLabelText('Ingrediente')).toBe(null);
    expect(queryByLabelText('Nome')).toBe(null);
    expect(queryByLabelText('Primeira Letra')).toBe(null);
    expect(queryByRole('button', { name: 'Buscar' })).toBe(null);

    const showSearchButton = getByTestId('search-top-btn');

    userEvent.click(showSearchButton);

    expect(queryByRole('textbox')).toBeInTheDocument();
    expect(queryByLabelText('Ingrediente')).toBeInTheDocument();
    expect(queryByLabelText('Nome')).toBeInTheDocument();
    expect(queryByLabelText('Primeira Letra')).toBeInTheDocument();
    expect(queryByRole('button', { name: 'Buscar' })).toBeInTheDocument();
    expect(queryByRole('button', { name: 'Buscar' })).toBeDisabled();

    userEvent.click(showSearchButton);

    expect(queryByRole('textbox')).toBe(null);
    expect(queryByLabelText('Ingrediente')).toBe(null);
    expect(queryByLabelText('Nome')).toBe(null);
    expect(queryByLabelText('Primeira Letra')).toBe(null);
    expect(queryByRole('button', { name: 'Buscar' })).toBe(null);

  });
});
