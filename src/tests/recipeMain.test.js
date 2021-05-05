import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeMain from '../pages/RecipeMain';
import MealsAndDrinkContext from '../context/MealsAndDrinkContext';
import meals from './mocks/mealsMocks';

const renderRecipeMain = () => (render(
  <MealsAndDrinkContext.Provider value={ meals }>
    <RecipeMain />
  </MealsAndDrinkContext.Provider>,
));

const reCard = /recipe-card$/;
const reImg = /recipe-img$/;
const reName = /recipe-name$/;
const reFilter = /category-filter$/;

describe('Requirement 25: Test Recipe Main Page with correct data-testid',
  () => {
    it('Has the correct data-testids in rendered food cards', () => {
      const { getAllByTestId } = renderRecipeMain();
      const recipesPerPage = 12;

      expect(getAllByTestId(reCard).length).toBe(recipesPerPage);
      expect(getAllByTestId(reImg).length).toBe(recipesPerPage);
      expect(getAllByTestId(reName).length).toBe(recipesPerPage);
    });
    it('Has the correct data-testids in rendered drink cards', () => {

    });
  });

describe.only('Requirement 26: render de 12 first food or drink recipes ',
  () => {
    it('Has the correct data-testids in rendered food/drink cards', () => {
      const { getAllByTestId } = renderRecipeMain();
      const recipeNames = getAllByTestId(reName);
      // const recipeImages = getAllByTestId(reImg);
      console.log(recipeNames[0].children[0].innerHTML);
    });
  });

describe('Requirement 27: render categories filter buttons',
  () => {
    it('Has the first 5 food/drink categories filter buttons', () => {
      const { getAllByTestId } = renderRecipeMain();
      const filterButtons = 6;
      expect(getAllByTestId(reFilter).length).toBe(filterButtons);
    });
  });

describe('Requirement 28: render categories filter buttons',
  () => {
    it('Has the first 5 food/drink categories filter buttons', () => {
      const { getByTestId } = renderRecipeMain();
      const beefFilter = getByTestId('Beef-category-filter');
      const breakfastFilter = getByTestId('Breakfast-category-filter');
      const chickenFilter = getByTestId('Chicken-category-filter');
      const dessertFilter = getByTestId('Dessert-category-filter');
      const goatFilter = getByTestId('Goat-category-filter');

      userEvent.click(beefFilter);

      userEvent.click(breakfastFilter);

      userEvent.click(chickenFilter);

      userEvent.click(dessertFilter);

      userEvent.click(goatFilter);
    });
  });
