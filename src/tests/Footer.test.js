import { fireEvent, screen } from '@testing-library/dom';
import React from 'react';
import Footer from '../components/Footer';
import renderWithRouter from './renderWithRouter';

describe('Footer component', () => {
  it('has an icon that redirect to /bebidas', () => {
    const { history } = renderWithRouter(<Footer />);
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinksIcon).toBeInTheDocument();
    fireEvent.click(drinksIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('has an icon that redirect to /comidas', () => {
    const { history } = renderWithRouter(<Footer />);
    const foodsIcon = screen.getByTestId('food-bottom-btn');
    expect(foodsIcon).toBeInTheDocument();
    fireEvent.click(foodsIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });

  it('has an icon that redirect to /explorar', () => {
    const { history } = renderWithRouter(<Footer />);
    const exploreIcon = screen.getByTestId('explore-bottom-btn');
    expect(exploreIcon).toBeInTheDocument();
    fireEvent.click(exploreIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
});
