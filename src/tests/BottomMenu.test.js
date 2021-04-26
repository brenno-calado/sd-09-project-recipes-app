import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import BottomMenu from '../components/BottomMenu';

describe('Testing <BottomMenu /> functionality', () => {
  it('should contain three links', () => {
    const { getAllByRole } = renderWithRouter(<BottomMenu />);
    const links = getAllByRole('link');
    const numberOfLinks = 3;
    expect(links).toHaveLength(numberOfLinks);
  });

  it('should have a navigation link with the path "/bebidas"', () => {
    const { getByAltText, history } = renderWithRouter(<BottomMenu />);
    const drinkImage = getByAltText('drinks buttom');
    fireEvent.click(drinkImage);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/bebidas');
  });

  it('should have a navigation link with the path "/comidas"', () => {
    const { getByAltText, history } = renderWithRouter(<BottomMenu />);
    const mealImage = getByAltText('meal buttom');
    fireEvent.click(mealImage);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas');
  });

  it('should have a navigation link with the path "/explorar"', () => {
    const { getByAltText, history } = renderWithRouter(<BottomMenu />);
    const exploreImage = getByAltText('search buttom');
    fireEvent.click(exploreImage);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar');
  });
});
