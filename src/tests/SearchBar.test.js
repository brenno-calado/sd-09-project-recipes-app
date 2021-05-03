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
import { act, cleanup } from '@testing-library/react';


const mockFetch = () => {
  jest.fn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(meals),
    }))
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mealCategories),
    }))
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(cocktails),
    }))
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(cocktailsCategories),
    }))
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mealsByIngredient),
    }));
}

describe('Testing <SearchBar /> functionality', () => {
  beforeEach(mockFetch);
  afterEach(cleanup);
  it('should show / hide the search bar', () => {
    const {
      getByTestId,
      queryByRole,
      queryByLabelText,
    } = renderWithRouter(<MainFoods />);

    expect(queryByRole('textbox')).toBe(null);
    expect(queryByLabelText('Ingrediente')).toBe(null);
    expect(queryByLabelText('Nome')).toBe(null);
    expect(queryByLabelText('Primeira Letra')).toBe(null);
    expect(queryByRole('button', { name: 'Buscar' })).toBe(null);

    const showSearchButton = getByTestId('search-top-btn');

    userEvent.click(showSearchButton);

    expect(queryByRole('textbox')).toBeInTheDocument();
    expect(queryByLabelText('Ingrediente')).toBeInTheDocument();
    expect(queryByLabelText('Nome')).toBeInTheDocument();
    expect(queryByLabelText('Primeira Letra')).toBeInTheDocument();
    expect(queryByRole('button', { name: 'Buscar' })).toBeInTheDocument();
    expect(queryByRole('button', { name: 'Buscar' })).toBeDisabled();

    userEvent.click(showSearchButton);

    expect(queryByRole('textbox')).toBe(null);
    expect(queryByLabelText('Ingrediente')).toBe(null);
    expect(queryByLabelText('Nome')).toBe(null);
    expect(queryByLabelText('Primeira Letra')).toBe(null);
    expect(queryByRole('button', { name: 'Buscar' })).toBe(null);
  });
  it('Should fetch by ingredient name', async () => {
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(mealsByIngredient),
    // }));
    
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

    await expect(screen.getByText('Brown Stew Chicken')).toBeInTheDocument();  

    expect(global.fetch).toBeCalledTimes(3);  
    // expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });
});
