import React from 'react';
import { render } from '@testing-library/react';
import Login from '../pages/Login';

describe('Tela de Login', () => {
  it('Verifica se o input email está na pagina de login', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
