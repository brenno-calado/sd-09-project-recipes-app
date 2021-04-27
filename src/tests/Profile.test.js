import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { Profile, Login } from '../pages';

describe('Testing <Profile /> functionality', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<Login />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);
    history.push('/perfil');
  });

  afterEach(() => jest.clearAllMocks());

  it('should have an element with the user email', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const userEmail = getByTestId('profile-email');
    const expectEmail = 'alguem@email.com';
    expect(userEmail.textContent).toContain(expectEmail);
  });

  it('should clear localStorage after clicking on "Sair" button', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const exitButton = getByTestId('profile-logout-btn');
    userEvent.click(exitButton);
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('should have a navigation link with the path "/receitas-feitas"', () => {
    const { history } = renderWithRouter(<Profile />);
    const doneButton = screen.getByTestId('profile-done-btn');
    userEvent.click(doneButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/receitas-feitas');
  });

  it('should have a navigation link with the path "/receitas-favoritas"', () => {
    const { getByTestId, history } = renderWithRouter(<Profile />);
    const favoriteButton = getByTestId('profile-favorite-btn');
    userEvent.click(favoriteButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/receitas-favoritas');
  });

  it('should have a navigation link with the path "/"', () => {
    const { getByTestId, history } = renderWithRouter(<Profile />);
    const logoutBtn = getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
