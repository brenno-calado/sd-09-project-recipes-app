import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import MutationObserver from '@sheerun/mutationobserver-shim';
import renderWithRouter from './helpers/renderWithRouter';
import { MainFoods } from '../pages';
import {
  meals,
  mealCategories,
  beefMeals,
  drinks,
  drinksCategories,
} from './mocks';
import {
  fetchMealsByCategory,
  fetchMealsCategories,
  fetchMealRecomendation,
} from '../services/MealApi';
import { fetchCocktailsCategories,
  fetchDrinksRecomendation } from '../services/CocktailApi';

window.MutationObserver = MutationObserver;

jest.mock('../services/MealApi');
fetchMealRecomendation.mockImplementation(() => Promise.resolve(meals.meals));
fetchMealsCategories.mockImplementation(() => Promise.resolve(mealCategories.meals));
fetchMealsByCategory.mockImplementation(() => Promise.resolve(beefMeals.meals));

jest.mock('../services/CocktailApi');
fetchDrinksRecomendation.mockImplementation(() => Promise.resolve(drinks.drinks));
fetchCocktailsCategories.mockImplementation(() => Promise
  .resolve(drinksCategories.drinks));

describe('Testing <MainFoods /> functionality', () => {
  it('Should display category buttons', async () => {
    await act(async () => {
      renderWithRouter(<MainFoods />, '/comidas');
    });

    expect(screen.queryByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Beef' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Breakfast' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Chicken' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Dessert' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Goat' })).toBeInTheDocument();
  });
  it('Should alternate between the meat category and initial list', async () => {
    await act(async () => {
      renderWithRouter(<MainFoods />, '/comidas');
    });

    expect(screen.queryByText('Corba')).toBeInTheDocument();
    expect(screen.queryByText('Beef and Mustard Pie')).not.toBeInTheDocument();

    const beefCategory = screen.queryByRole('button', { name: 'Beef' });

    userEvent.click(beefCategory);

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-message'));

    expect(screen.queryByText('Corba')).not.toBeInTheDocument();
    expect(screen.queryByText('Beef and Mustard Pie')).toBeInTheDocument();
  });
});
