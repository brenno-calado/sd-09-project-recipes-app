import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';

import FooterMenu from '../components/FooterMenu';

describe('Testa o comportamento do componente <FooterMenu />', () => {
  test('Se apresenta os icones relacionados aos drinks, explorar e comidas', () => {
    renderWithRouter(<FooterMenu />);

    const images = screen.getAllByRole('img');

    expect(images[0]).toBeInTheDocument();
    expect(images[0].src).toBe('http://localhost/drinkIcon.svg');
    expect(images[1]).toBeInTheDocument();
    expect(images[1].src).toBe('http://localhost/exploreIcon.svg');
    expect(images[2]).toBeInTheDocument();
    expect(images[2].src).toBe('http://localhost/mealIcon.svg');
  });

  test('Se redireciona corretamente ao clicar em um icone', () => {
    const { history } = renderWithRouter(<FooterMenu />);

    const images = screen.getAllByRole('img');

    fireEvent.click(images[0]);
    const pathDrink = history.location.pathname;
    expect(pathDrink).toBe('/bebidas');

    fireEvent.click(images[1]);
    const pathExplore = history.location.pathname;
    expect(pathExplore).toBe('/explorar');

    fireEvent.click(images[2]);
    const pathMeal = history.location.pathname;
    expect(pathMeal).toBe('/comidas');
  });
});
