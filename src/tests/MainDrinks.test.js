import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import MutationObserver from '@sheerun/mutationobserver-shim';
import renderWithRouter from './helpers/renderWithRouter';
import { MainDrinks } from '../pages';
import {
  meals,
  mealCategories,
  drinks,
  drinksCategories,
  cocoaDrinks,
} from './mocks';
import {
  fetchMealsCategories,
  fetchMealsList,
} from '../services/MealApi';
import {
  fetchCocktailsCategories,
  fetchCocktailsList,
  fetchCocktailsByCategory,
} from '../services/CocktailApi';

window.MutationObserver = MutationObserver;

jest.mock('../services/MealApi');
fetchMealsList.mockImplementation(() => Promise.resolve(meals.meals));
fetchMealsCategories.mockImplementation(() => Promise.resolve(mealCategories.meals));

jest.mock('../services/CocktailApi');
fetchCocktailsList.mockImplementation(() => Promise.resolve(drinks.drinks));
fetchCocktailsCategories.mockImplementation(() => Promise
  .resolve(drinksCategories.drinks));
fetchCocktailsByCategory.mockImplementation(() => Promise
  .resolve(cocoaDrinks.drinks));

describe('Testing <MainDrinks /> functionality', () => {
  it('Should display category buttons', async () => {
    await act(async () => {
      renderWithRouter(<MainDrinks />, '/bebidas');
    });

    expect(screen.queryByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Ordinary Drink' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cocktail' })).toBeInTheDocument();
    expect(screen
      .queryByRole('button', { name: 'Milk / Float / Shake' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Other/Unknown' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cocoa' })).toBeInTheDocument();
  });
  it('Should alternate between the Cocoa category and initial list', async () => {
    await act(async () => {
      renderWithRouter(<MainDrinks />, '/bebidas');
    });

    expect(screen.queryByText('GG')).toBeInTheDocument();
    expect(screen.queryByText('Castillian Hot Chocolate')).not.toBeInTheDocument();

    const cocoaCategory = screen.queryByRole('button', { name: 'Cocoa' });

    userEvent.click(cocoaCategory);

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-message'));

    expect(screen.queryByText('GG')).not.toBeInTheDocument();
    expect(screen.queryByText('Castillian Hot Chocolate')).toBeInTheDocument();
  });
});
