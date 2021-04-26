import React from 'react';
import { render } from '@testing-library/react';
import Login from './Pages/Login/Login';

// import App from './App';

// test('Farewell, front-end', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/TRYBE/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Testa pagina de Login', () => {
  test('Testa se encontra os input de email e senha e botão de entrar', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId('email-input');

    expect(emailInput).toBeInTheDocument();
  });
});
