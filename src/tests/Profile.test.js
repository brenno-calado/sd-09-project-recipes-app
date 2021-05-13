import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from './testRender';
import Profile from '../Pages/Profile';

describe('Perfil teste', () => {
  test('Verifica se renderizou a pagina de Profile', () => {
    const { getByText } = renderWithRouterAndStore(<Profile />);
    const title = getByText('Perfil');

    expect(title).toBeInTheDocument();
  });

  test('Verifica se aparece o email', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'email@mail.com' }));
    const { getByTestId } = renderWithRouterAndStore(<Profile />);
    const email = getByTestId('profile-email');

    expect(email).toBeInTheDocument();
    expect(email.textContent).toBe('email@mail.com');
  });

  test('Verifica se tem 3 buttons', () => {
    const { getByTestId, history } = renderWithRouterAndStore(<Profile />);
    const recipeDoneButton = getByTestId('profile-done-btn');
    const recipeFavoriteButton = getByTestId('profile-favorite-btn');
    const exitButton = getByTestId('profile-logout-btn');

    expect(recipeDoneButton).toBeInTheDocument();
    expect(recipeFavoriteButton).toBeInTheDocument();
    expect(exitButton).toBeInTheDocument();

    fireEvent.click(recipeDoneButton);
    expect(history.location.pathname).toBe('/receitas-feitas');

    fireEvent.click(recipeFavoriteButton);
    expect(history.location.pathname).toBe('/receitas-favoritas');

    fireEvent.click(exitButton);
    expect(history.location.pathname).toBe('/');
  });
});
