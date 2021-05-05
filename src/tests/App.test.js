import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import RecipesProvider from '../context/RecipesContext';
import { meals, drinks } from './testData';

const mockFetchMeals = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(meals),
    }));
};
const mockFetchDrinks = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(drinks),
    }));
}

const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  return { ...resources };
};

describe('1 - Testes da Pagina de login', () => {
  it('A rota "/" deve renderizar a pagina de login', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toEqual('/');
  });

  it('A pagina de login deve conter um campo de email', () => {
    const { getByPlaceholderText } = renderWithRouter(<App />);
    const emailInput = getByPlaceholderText('E-mail');
    expect(emailInput).toBeInTheDocument();
  });

  it('A pagina de login deve conter um campo de senha', () => {
    const { getByPlaceholderText } = renderWithRouter(<App />);
    const emailInput = getByPlaceholderText('Senha');
    expect(emailInput).toBeInTheDocument();
  });

  it('A pagina de login deve conter um botão para submit', () => {
    const { getByRole } = renderWithRouter(<App />);
    const submitButton = getByRole('button');
    expect(submitButton).toHaveTextContent('Entrar');
    expect(submitButton).toBeInTheDocument();
  });

  it('O email de login deve ser salvo no localStorage, na chave "user"', () => {
    localStorage.clear();
    const { getByPlaceholderText } = renderWithRouter(<App />);
  });
});
