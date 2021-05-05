import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { ExploreFoods } from '../pages';

const drinkLink = '/explorar/comidas';

describe('ExploreFoods page', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<ExploreFoods />);
    history.push(drinkLink);
  });
  afterEach(() => jest.clearAllMocks());

  it('should be on the route \'/explorar/comidas\'', () => {
    const { history } = renderWithRouter(<ExploreFoods />, drinkLink);
    expect(history.location.pathname).toBe(drinkLink);
  });
  it('should have an two buttons to ExploreFoods', () => {
    const { getAllByTestId } = renderWithRouter(<ExploreFoods />, drinkLink);
    const [ingredientButton] = getAllByTestId('explore-by-ingredient');
    const [surpriseButton] = getAllByTestId('explore-surprise');

    expect(ingredientButton).toBeInTheDocument();
    expect(surpriseButton).toBeInTheDocument();
    expect(ingredientButton.textContent).toContain('Por Ingredientes');
    expect(surpriseButton.textContent).toContain('Me Surpreenda!');
  });
  it('Should change route to  \'/explorar/comidas/ingredientes\' on click button', () => {
    const { history, getAllByTestId } = renderWithRouter(<ExploreFoods />, drinkLink);
    const ingredientButton = getAllByTestId('explore-by-ingredient');

    fireEvent.click(ingredientButton[1]);

    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
  });
});
