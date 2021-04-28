import React from 'react';
import { render } from '@testing-library/react';
import RecipeMain from '../pages/RecipeMain';
import MealsAndDrinkContext from '../context/MealsAndDrinkContext';

import meals from './mocks/mealsMocks';

const renderRecipeMain = () => (render(
  <MealsAndDrinkContext.Provider value={ meals }>
    <RecipeMain />
  </MealsAndDrinkContext.Provider>,
));
describe('Requirement 25: Test Recipe Main Page with correct data-testid',
  () => {
    it('Has the correct data-testids in rendered food cards', () => {
      const { getAllByTestId } = renderRecipeMain();
    });
    it('Has the correct data-testids in rendered drink cards', () => {

    });
  });

describe('Requirement 26: render de 12 first food or drink recipes ',
  () => {
    it('Has the correct data-testids in rendered food cards', () => {
      const { getByTestId } = renderRecipeMain();
    });
    it('Has the correct data-testids in rendered drink cards', () => {

    });
  });
