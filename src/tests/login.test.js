import React from 'react';
import { render } from '@testing-library/react';
import Login from '../pages/login';

describe('Login Page', () => {
  it('Verifica se o input email, password e botao estao na pagina de login', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
