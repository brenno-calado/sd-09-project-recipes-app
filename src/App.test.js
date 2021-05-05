import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import renderWithRouter from './renderWithRouter';
import RecipesProvider from './context/RecipesContext';
import { meals, drinks } from './testData';

const mockFetchMeals = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(meals)
    }));
}
const mockFetchDrinks = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(drinks)
    }));
}

describe('1 - Testes da Pagina de login', () => {
  it('A rota "/" deve renderizar a pagina de login', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toEqual('/');
  })
})
