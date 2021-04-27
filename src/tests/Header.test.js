import { screen } from '@testing-library/react';

import renderWithRouter from './helpers/renderWithRouter';
import renderWithRedux from './helpers/renderWithRedux';

describe('Testa o componente Header', () => {
  it('Deve conter um titulo', () => {
    renderWithRedux(renderWithRouter(['/comidas']));

    const title = screen.getByTestId('page-title');

    expect(title).toBeInTheDocument();
  });

  it('Deve conter um botão para o perfil', () => {
    renderWithRedux(renderWithRouter(['/comidas']));

    const title = screen.getByTestId('profile-top-btn');

    expect(title).toBeInTheDocument();
  });

  it('Deve conter um botão para a busca', () => {
    renderWithRedux(renderWithRouter(['/comidas']));

    const title = screen.getByTestId('search-top-btn');

    expect(title).toBeInTheDocument();
  });
});
