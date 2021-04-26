import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

describe('Testa a página de Login', () => {
  describe('Verifica se os elementos foram criados', () => {
    test('Verifica se existe o input de email', () => {
      const { getByTestId } = renderWithRouter(<Login />);

      const emailInput = getByTestId(/email-input/i);
      expect(emailInput).toBeInTheDocument();
    });
    test('Verifica se existe o input de senha', () => {
      const { getByTestId } = renderWithRouter(<Login />);

      const passwordInput = getByTestId(/password-input/i);
      expect(passwordInput).toBeInTheDocument();
    });
    test('Verifica se existe o botao de "Entrar"', () => {
      const { getByTestId } = renderWithRouter(<Login />);

      const submitButton = getByTestId(/login-submit-btn/i);
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent('Entrar');
    });
  });
  describe('Verifica se é possivel fazer o login', () => {
    test('Verifica se é possivel escrever nos inputs e fazer o login', () => {
      const { getByTestId, history } = renderWithRouter(<Login />);

      const submitButton = getByTestId('login-submit-btn');
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      const emailInput = getByTestId(/email-input/i);
      expect(emailInput).toHaveTextContent('');
      userEvent.type(getByTestId('email-input'), 'email@pessoa.com.br');
      expect(getByTestId('email-input')).toHaveValue('email@pessoa.com.br');

      const passwordInput = getByTestId(/password-input/i);
      expect(passwordInput).toHaveTextContent('');
      userEvent.type(getByTestId('password-input'), '1234567');
      expect(getByTestId('password-input')).toHaveValue('1234567');

      expect(getByTestId('login-submit-btn')).toBeEnabled();
      userEvent.click(submitButton);
      const { pathname } = history.location;
      expect(pathname).toBe('/comidas');

      const user = JSON.parse(localStorage.getItem('user'));
      expect(user.email).toBe('email@pessoa.com.br');
    });
  });
});
