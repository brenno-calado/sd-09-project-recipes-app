import React from 'react';
import { fireEvent, within } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import Recipes from '../pages/Recipes/Recipes';
import UserProfile from '../pages/UserProfile/UserProfile';

describe('Testes do componente UserProfile', () => {
  it('Pagina principal deve conter um link para a pagina de perfil', async () => {
    const { getByTestId, findByText } = renderWithRouter(<Recipes />);
    await findByText('Comidas');
    const profileLink = getByTestId('profile-top-btn');
    expect(profileLink).toBeDefined();
  });

  it('O link deve redirecionar para a url "/perfil"', async () => {
    const { history, getByTestId, findByText } = renderWithRouter(<Recipes />);
    await findByText('Comidas');
    const profileLink = getByTestId('profile-top-btn');
    expect(profileLink).toBeDefined();
    fireEvent.click(profileLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  it('A pagina de perfil deve conter o Titulo "Perfil"', () => {
    const { getByText } = renderWithRouter(<UserProfile />);
    const title = getByText('Perfil');
    expect(title).toBeInTheDocument();
  });

  it('Deve renderizar o componente Header', () => {
    const { getByTestId } = renderWithRouter(<UserProfile />);
    const userProfile = getByTestId('test-profile');
    const header = within(userProfile).getByTestId('test-header');
    expect(header).toBeDefined();
  });

  it('Deve renderizar o componente Footer', () => {
    const { getByTestId } = renderWithRouter(<UserProfile />);
    const userProfile = getByTestId('test-profile');
    const footer = within(userProfile).getByTestId('footer');
    expect(footer).toBeDefined();
  });
});
