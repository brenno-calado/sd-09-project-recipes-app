import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { MainFoods } from '../pages';
import { screen, waitFor } from '@testing-library/react';
import {
  meals,
  mealsByIngredient,
  mealCategories,
  cocktails,
  cocktailsCategories,
} from './mocks';
import { act } from '@testing-library/react';
import { fetchMealApi, fetchMealsCategories, fetchMealsList } from '../services/MealApi';
import { fetchCocktailApi, fetchCocktailsCategories, fetchCocktailsList } from '../services/CocktailApi';

jest.mock('../services/MealApi');
fetchMealsList.mockImplementation(() => Promise.resolve(meals.meals));
fetchMealsCategories.mockImplementation(() => Promise.resolve(mealCategories.meals));
fetchMealApi.mockImplementation(() => Promise.resolve(mealsByIngredient.meals));
jest.mock('../services/CocktailApi');
fetchCocktailsList.mockImplementation(() => Promise.resolve(cocktails.drinks));
//fetchCocktailApi.mockImplementation(() => Promise.resolve(cocktails.drinks));
fetchCocktailsCategories.mockImplementation(() => Promise.resolve(cocktailsCategories.drinks));

describe('Testing <SearchBar /> functionality', () => {
  it('should show / hide the search bar', async () => {
    await act(async () => {
      renderWithRouter(<MainFoods />);
    })

    expect(screen.queryByRole('textbox')).toBe(null);
    expect(screen.queryByLabelText('Ingrediente')).toBe(null);
    expect(screen.queryByLabelText('Nome')).toBe(null);
    expect(screen.queryByLabelText('Primeira Letra')).toBe(null);
    expect(screen.queryByRole('button', { name: 'Buscar' })).toBe(null);

    const showSearchButton = screen.getByTestId('search-top-btn');

    userEvent.click(showSearchButton);

    expect(screen.queryByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByLabelText('Ingrediente')).toBeInTheDocument();
    expect(screen.queryByLabelText('Nome')).toBeInTheDocument();
    expect(screen.queryByLabelText('Primeira Letra')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Buscar' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Buscar' })).toBeDisabled();

    userEvent.click(showSearchButton);

    expect(screen.queryByRole('textbox')).toBe(null);
    expect(screen.queryByLabelText('Ingrediente')).toBe(null);
    expect(screen.queryByLabelText('Nome')).toBe(null);
    expect(screen.queryByLabelText('Primeira Letra')).toBe(null);
    expect(screen.queryByRole('button', { name: 'Buscar' })).toBe(null);
  });
  it('Should fetch by ingredient name', async () => {
    await act(async () => {
      renderWithRouter(<MainFoods />);
    });

    const showSearchButton = screen.getByTestId('search-top-btn');

    userEvent.click(showSearchButton);

    const searchText = screen.getByTestId('search-input');
    const filter = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(searchText, 'Chicken');
    userEvent.click(filter);
    userEvent.click(searchButton);

    await waitFor(() =>screen.findByText('Brown Stew Chicken'));

    expect(global.fetch).toBeCalledTimes(3);  
    // // expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });
});
