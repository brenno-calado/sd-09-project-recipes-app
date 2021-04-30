import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { ExploreDrinks } from '../pages';

const drinkLink = '/explorar/bebidas';

describe('ExploreDrinks page', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<ExploreDrinks />);
    history.push(drinkLink);
  });
  afterEach(() => jest.clearAllMocks());

  it('should be on the route \'/explorar/bebidas\'', () => {
    const { history } = renderWithRouter(<ExploreDrinks />, drinkLink);
    expect(history.location.pathname).toBe(drinkLink);
  });
  it('should have an two buttons to ExploreDrinks', () => {
    const { getAllByTestId } = renderWithRouter(<ExploreDrinks />, drinkLink);
    const [ingredientButton] = getAllByTestId('explore-by-ingredient');
    const [surpriseButton] = getAllByTestId('explore-surprise');

    expect(ingredientButton).toBeInTheDocument();
    expect(surpriseButton).toBeInTheDocument();
    expect(ingredientButton.textContent).toContain('Por Ingredientes');
    expect(surpriseButton.textContent).toContain('Me Surpreenda!');
  });
  it('Should change route to  \'/explorar/bebidas/ingredientes\' on click button', () => {
    const { history, getAllByTestId } = renderWithRouter(<ExploreDrinks />, drinkLink);
    const ingredientButton = getAllByTestId('explore-by-ingredient');

    fireEvent.click(ingredientButton[1]);

    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });
});
