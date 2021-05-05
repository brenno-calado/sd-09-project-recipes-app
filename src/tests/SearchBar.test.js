import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, act } from '@testing-library/react';
import MutationObserver from '@sheerun/mutationobserver-shim';
import renderWithRouter from './helpers/renderWithRouter';
import { MainDrinks, MainFoods } from '../pages';
import {
  meals,
  mealsByIngredient,
  mealCategories,
  drinks,
  drinksCategories,
  drinksByIngredient,
} from './mocks';
import {
  fetchMealApi,
  fetchMealsCategories,
  fetchMealsList,
} from '../services/MealApi';
import {
  fetchCocktailApi,
  fetchCocktailsCategories,
  fetchCocktailsList,
} from '../services/CocktailApi';

window.MutationObserver = MutationObserver;

const FIRST_LETTER = 'Primeira Letra';
const SEARCH = 'Buscar';
const SEARCH_BUTTON = 'search-top-btn';

jest.mock('../services/MealApi');
fetchMealsList.mockImplementation(() => Promise.resolve(meals.meals));
fetchMealsCategories.mockImplementation(() => Promise.resolve(mealCategories.meals));

jest.mock('../services/CocktailApi');
fetchCocktailsList.mockImplementation(() => Promise.resolve(drinks.drinks));
fetchCocktailsCategories.mockImplementation(() => Promise
  .resolve(drinksCategories.drinks));

describe('Testing <SearchBar /> functionality', () => {
  it('should show / hide the search bar', async () => {
    await act(async () => {
      renderWithRouter(<MainFoods />);
    });

    expect(screen.queryByRole('textbox')).toBe(null);
    expect(screen.queryByLabelText('Ingrediente')).toBe(null);
    expect(screen.queryByLabelText('Nome')).toBe(null);
    expect(screen.queryByLabelText(FIRST_LETTER)).toBe(null);
    expect(screen.queryByRole('button', { name: SEARCH })).toBe(null);

    const showSearchButton = screen.getByTestId(SEARCH_BUTTON);

    userEvent.click(showSearchButton);

    expect(screen.queryByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByLabelText('Ingrediente')).toBeInTheDocument();
    expect(screen.queryByLabelText('Nome')).toBeInTheDocument();
    expect(screen.queryByLabelText(FIRST_LETTER)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: SEARCH })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: SEARCH })).toBeDisabled();

    userEvent.click(showSearchButton);

    expect(screen.queryByRole('textbox')).toBe(null);
    expect(screen.queryByLabelText('Ingrediente')).toBe(null);
    expect(screen.queryByLabelText('Nome')).toBe(null);
    expect(screen.queryByLabelText(FIRST_LETTER)).toBe(null);
    expect(screen.queryByRole('button', { name: SEARCH })).toBe(null);
  });
  it('Should fetch by meal ingredient', async () => {
    fetchMealApi.mockResolvedValue(mealsByIngredient.meals);
    await act(async () => {
      renderWithRouter(<MainFoods />, '/comidas');
    });

    const showSearchButton = screen.getByTestId(SEARCH_BUTTON);

    userEvent.click(showSearchButton);

    const searchText = screen.getByTestId('search-input');
    const filter = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(searchText, 'Chicken');
    userEvent.click(filter);
    userEvent.click(searchButton);

    await waitFor(() => expect(fetchMealApi).toHaveBeenCalled());

    expect(screen.queryByText('Brown Stew Chicken')).toBeInTheDocument();
  });
  it('Should fetch by drink ingredient', async () => {
    fetchCocktailApi.mockImplementation(() => Promise.resolve(drinksByIngredient.drinks));

    await act(async () => {
      renderWithRouter(<MainDrinks />, '/bebidas');
    });

    const showSearchButton = screen.getByTestId(SEARCH_BUTTON);

    userEvent.click(showSearchButton);

    const searchText = screen.getByTestId('search-input');
    const filter = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(searchText, 'Light rum');
    userEvent.click(filter);
    userEvent.click(searchButton);

    await waitFor(() => expect(fetchCocktailApi).toHaveBeenCalled());

    expect(screen.queryByText('151 Florida Bushwacker')).toBeInTheDocument();
  });
});
