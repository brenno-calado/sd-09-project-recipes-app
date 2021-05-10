import React from 'react';
import renderWithRouter from '../renderWithRouter';
import ReceitasPrincipal from '../pages/ReceitasPrincipal';

describe('2 - Teste o componente ReceitasPrincipal.js', () => {
  it('A rota "/comidas" renderiza ReceitasPrincipal.js', () => {
    const { history } = renderWithRouter(<ReceitasPrincipal />);
    const { pathname } = history.location;
    const urlApp = pathname;
    expect(urlApp).toBe('/comidas');
  });
});
