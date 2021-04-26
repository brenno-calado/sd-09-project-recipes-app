import React from 'react';
import { render } from '@testing-library/react';
import Login from '../Pages/Login/Login';

describe('Testa pagina de Login', () => {
  test('Testa se encontra os input de email e senha e botão de entrar', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId('email-input');

    expect(emailInput).toBeInTheDocument();
  });
});
