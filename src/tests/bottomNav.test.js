import React from 'react';
import userEvent from '@testing-library/user-event';
import BottomNav from '../components/BottomNav';
import renderWithRouter from './renderWithRouter';

describe('Requirement 19: Test Bottom Navigation Menu', () => {
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

describe('Requirement 20: Test Bottom Navigation Menu Positon and Icons', () => {
  it('Is fixed at the bottom of the page', () => {
    const { getByTestId } = renderWithRouter(<BottomNav />);
    const bottomNav = getByTestId('footer');

    expect(bottomNav).toHaveStyle('position: fixed');
    expect(bottomNav).toHaveStyle('bottom: 0');
  });
  it('Has the correct Icon images', () => {
    const { getByTestId } = renderWithRouter(<BottomNav />);
    const drinksIcon = getByTestId('drinks-bottom-btn');
    const exploreIcon = getByTestId('explore-bottom-btn');
    const foodsIcon = getByTestId('food-bottom-btn');

    expect(drinksIcon).toHaveAttribute('src', 'drinkIcon.svg');
    expect(exploreIcon).toHaveAttribute('src', 'exploreIcon.svg');
    expect(foodsIcon).toHaveAttribute('src', 'mealIcon.svg');
  });
});
