import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('1 - Teste o componente App.js', () => {
  it('A rota "/" renderiza Login.js', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const urlApp = pathname;
    expect(urlApp).toBe('/');
  });
});
