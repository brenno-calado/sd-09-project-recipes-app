import React from 'react';
import { screen } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import renderWithRouter from './renderWithRouter';

describe('Testa a existência dos componentes da tela de login', () => {
  it('Verifica a existência do elemento que receberá o email de usuário.', () => {
    renderWithRouter(<LoginForm />);

    const inputUserEmail = screen.getByTestId('email-input');
    expect(inputUserEmail).toBeInTheDocument();
  });
  it('Verifica a existência do elemento que receberá a senha de usuário.', () => {
    renderWithRouter(<LoginForm />);

    const inputUserPassword = screen.getByTestId('password-input');
    expect(inputUserPassword).toBeInTheDocument();
  });
  it('Confirma a existência do Botão que submete os dados do usuário.', () => {
    renderWithRouter(<LoginForm />);

    const buttonSubmit = screen.getByTestId('login-submit-btn');
    expect(buttonSubmit).toBeInTheDocument();
  });
});
