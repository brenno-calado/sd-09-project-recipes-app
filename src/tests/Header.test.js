import React from 'react';
import userEvent from '@testing-library/user-event';
// import renderWithRouter from './renderWithRouter';
import { renderWithRouterAndStore } from './renderWithRouterAndStore';
import Meals from '../pages/Meals';
// import Cocktails from '../pages/Cocktails';
// import Login from '../pages/Login';

describe('Testa o Header a partir da page de comidas', () => {
  const INITIAL_STATE = {
    pathname: '/comidas',
    isFetching: false,
    data: [],
    error: '',
    isFetched: false,
    recipeType: '',
  };
  test('Testa se há os ícones no header', () => {
    const location = { pathname: '/comidas' };
    const { getByTestId, getByText, getAllByTestId } = renderWithRouterAndStore(<Meals location={ location } />, '/comidas', INITIAL_STATE);
    const mailsTitles = getByText('Comidas');
    expect(mailsTitles).toBeInTheDocument();
    const profileTopBtn = getByTestId('profile-top-btn');
    expect(profileTopBtn).toBeInTheDocument();
    expect(profileTopBtn).toHaveAttribute('src', 'profileIcon.svg');
    const pageTitle = getAllByTestId('page-title')[1];
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/Recipes App/i);
    const searchTopBtn = getByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();
    expect(searchTopBtn).toHaveAttribute('src', 'searchIcon.svg');
  });

  test('Testa se redireciona para a pagina de perfil', () => {
    const location = { pathname: '/comidas' };
    const { getByTestId, history } = renderWithRouterAndStore(
      <Meals location={ location } />,
      '/comidas',
      INITIAL_STATE,
    );
    const profileTopBtn = getByTestId('profile-top-btn');
    expect(profileTopBtn).toBeInTheDocument();
    userEvent.click(profileTopBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  test('Testa ao clicar na barra de busca, ela aparece', () => {
    const location = { pathname: '/comidas' };
    const { getByTestId } = renderWithRouterAndStore(
      <Meals location={ location } />,
      '/comidas',
      INITIAL_STATE,
    );
    const searchTopBtn = getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);
    expect(getByTestId('search-input')).toBeInTheDocument();
    userEvent.click(searchTopBtn);
    // expect(getByTestId('search-input')).toBeNull();
    console.log(getByTestId('search-input'));

  });
});
