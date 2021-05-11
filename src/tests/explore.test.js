import React from 'react';
import userEvent from '@testing-library/user-event';
import Explore from '../pages/explore';
import renderWithRouter from './renderWithRouter';

describe('Tela de explorar', () => {
  it('Verifica se a tela tem 2 botões', () => {
    const page = renderWithRouter(<Explore />, { route: '/explorar' });
    const buttons = page.getAllByRole('button');

    expect(buttons).toHaveLength(2);
    expect(buttons[0].textContent).toBe('Explorar Comidas');
    expect(buttons[1].textContent).toBe('Explorar Bebidas');
  });

  it('Deve redirecionar para a tela "Explorar Comidas" ao clicar no primeiro '
  + 'botão', () => {
    const { getByTestId, history } = renderWithRouter(
      <Explore />, { route: '/explorar' },
    );
    const exploreFood = getByTestId('explore-food');

    userEvent.click(exploreFood);

    const redirect = history.location.pathname;

    expect(exploreFood).toBeInTheDocument();
    expect(redirect).toBe('/explorar/comidas');
  });
});
