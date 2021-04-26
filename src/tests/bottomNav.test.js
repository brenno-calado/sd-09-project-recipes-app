import React from 'react';
import userEvent from '@testing-library/user-event';
import BottomNav from '../components/BottomNav';
import renderWithRouter from './renderWithRouter';

describe('Test Bottom Navigation Menu', () => {
  it('Has data-testid="footer"', () => {
    const { getByTestId } = renderWithRouter(<BottomNav />);
    const bottomNav = getByTestId('footer');
    expect(bottomNav).toBeInTheDocument();
  });
  it('The element that redirects to drinks page has data-testid="drinks-bottom-btn"',
    () => {
      const { getByTestId, history } = renderWithRouter(<BottomNav />);
      const drinksIcon = getByTestId('drinks-bottom-btn');
      expect(drinksIcon).toBeInTheDocument();
      userEvent.click(drinksIcon);
      const { pathname: currentPath } = history.location;
      expect(currentPath).toBe('/bebidas');
    });
  it('The element that redirects to explore page has data-testid="explore-bottom-btn"',
    () => {
      const { getByTestId, history } = renderWithRouter(<BottomNav />);
      const exploreIcon = getByTestId('explore-bottom-btn');
      expect(exploreIcon).toBeInTheDocument();
      userEvent.click(exploreIcon);
      const { pathname: currentPath } = history.location;
      expect(currentPath).toBe('/explorar');
    });
  it('The element that redirects to foods page has data-testid="food-bottom-btn"', () => {
    const { getByTestId, history } = renderWithRouter(<BottomNav />);
    const foodsIcon = getByTestId('food-bottom-btn');
    expect(foodsIcon).toBeInTheDocument();
    userEvent.click(foodsIcon);
    const { pathname: currentPath } = history.location;
    expect(currentPath).toBe('/comidas');
  });
});
