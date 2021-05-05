import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import Footer from '../common/components/Footer';

describe('Testes do componente Footer', () => {
  it('deve conter uma tag footer e tres tags button', () => {
    const { getAllByRole, getByTestId } = renderWithRouter(<Footer />);
    const footer = getByTestId('footer');
    const button = getAllByRole('button');
    const buttonLength = button.length;
    expect(footer).toBeDefined();
    expect(button).toHaveLength(buttonLength);
  });

  it('ao clicar em bebidas deve redirecionar para a url "/bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<Footer />);
    const drinksButton = getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeDefined();
    fireEvent.click(drinksButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('ao clicar em comidas deve redirecionar para a url "/comidas', () => {
    const { getByTestId, history } = renderWithRouter(<Footer />);
    const mealsButton = getByTestId('food-bottom-btn');
    expect(mealsButton).toBeDefined();
    fireEvent.click(mealsButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });

  it('ao clicar em explorar deve redirecionar para a url "/explorar', () => {
    const { getByTestId, history } = renderWithRouter(<Footer />);
    const exploreButton = getByTestId('explore-bottom-btn');
    expect(exploreButton).toBeDefined();
    fireEvent.click(exploreButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
});
