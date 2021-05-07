import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const buttonTestId = 'login-submit-btn';
const emailTestId = 'email-input';
const passwordTestId = 'password-input';

describe('Testes tela login', () => {
  it('Encontre os elementos na tela', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByTestId(buttonTestId);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('O botão inicia desabilitado', () => {
    renderWithRouter(<App />);

    const loginButton = screen.getByTestId(buttonTestId);

    expect(loginButton).toBeDisabled();
  });

  it('O botão é habilitado com o email correto e a senha com mais de 6 caracteres',
    () => {
      renderWithRouter(<App />);

      const emailInput = screen.getByTestId(emailTestId);
      const passwordInput = screen.getByTestId(passwordTestId);
      const loginButton = screen.getByTestId(buttonTestId);

      userEvent.type(emailInput, 'email@email.co');
      userEvent.type(passwordInput, '1234567');

      expect(loginButton).toBeEnabled();
    });

  it('Clicar no botão adiciona valores ao localStorage', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByTestId(buttonTestId);

    userEvent.type(emailInput, 'email@email.co');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    expect(localStorage.getItem('mealsToken')).not.toBeUndefined();
    expect(localStorage.getItem('cocktailsToken')).not.toBeUndefined();
    expect(localStorage.getItem('user')).not.toBeUndefined();
  });
});
