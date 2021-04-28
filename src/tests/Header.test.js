import React from 'react';
import { fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testing <Header /> functionality', () => {
  it('should contain one link, two buttons and one heading', () => {
    const { getAllByRole } = renderWithRouter(<Header />, '/comidas');
    const link = getAllByRole('link');
    const imgs = getAllByRole('img');
    const btn = getAllByRole('button');
    const title = getAllByRole('heading', { level: 1, name: 'Comidas' });

    expect(link.length).toBe(1);
    expect(imgs.length).toBe(2);
    expect(title.length).toBe(1);
    expect(btn.length).toBe(1);
  });

  it('should have a navigation link with the path "/perfil"', () => {
    const { getByRole, history } = renderWithRouter(<Header />, '/comidas');
    const profileLink = getByRole('link');
    fireEvent.click(profileLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/perfil');
  });

  it('should have a button thats show an input', () => {
    const { getByRole, queryByTestId } = renderWithRouter(<Header />, '/comidas');
    let input = queryByTestId('search-input');
    expect(input).toBe(null);

    const searchBtn = getByRole('button');
    fireEvent.click(searchBtn);
    input = queryByTestId('search-input');
    expect(input).not.toBe(null);
  });

  it('must display the pathname as a title', () => {
    const { queryByRole } = renderWithRouter(<Header />, '/explorar/bebidas');

    const title = queryByRole('heading', { level: 1, name: 'Explorar Bebidas' });
    expect(title).not.toBe(null);
  });

  it('must remove "/" from title', () => {
    const { queryByRole } = renderWithRouter(<Header />, '/bebidas/');

    const title = queryByRole('heading', { level: 1, name: 'Bebidas' });
    expect(title).not.toBe(null);
  });

  it('should replace "area" from url with "Origem"', () => {
    const { queryByRole } = renderWithRouter(<Header />, '/explorar/comidas/area');

    const title = queryByRole('heading', { level: 1, name: 'Explorar Origem' });
    expect(title).not.toBe(null);
  });
});
