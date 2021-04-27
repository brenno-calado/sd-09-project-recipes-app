import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import Header from '../components/Header';
import RecipesAppProvider from '../context/RecipesAppProvider';

describe('Testing <Header /> functionality', () => {
  it('should contain one link, two buttons and one heading', () => {
    const history = createMemoryHistory();
    history.push('/comidas');
    const { getAllByRole } = render(
      <RecipesAppProvider>
        <Router history={ history }>
          <Header />
        </Router>
      </RecipesAppProvider>,
    );

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
    const history = createMemoryHistory();
    history.push('/comidas');
    const { getByRole } = render(
      <RecipesAppProvider>
        <Router history={ history }>
          <Header />
        </Router>
      </RecipesAppProvider>,
    );
    const profileLink = getByRole('link');
    fireEvent.click(profileLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/perfil');
  });

  it('should have a button thats show an input', () => {
    const history = createMemoryHistory();
    history.push('/comidas');
    const { getByRole, queryByTestId } = render(
      <RecipesAppProvider>
        <Router history={ history }>
          <Header />
        </Router>
      </RecipesAppProvider>,
    );
    let input = queryByTestId('search-input');
    expect(input).toBe(null);

    const searchBtn = getByRole('button');
    fireEvent.click(searchBtn);
    input = queryByTestId('search-input');
    expect(input).not.toBe(null);
  });

  it('must display the pathname as a title', () => {
    const history = createMemoryHistory();
    history.push('/explorar/bebidas');
    const { queryByRole } = render(
      <RecipesAppProvider>
        <Router history={ history }>
          <Header />
        </Router>
      </RecipesAppProvider>,
    );

    const title = queryByRole('heading', { level: 1, name: 'Explorar Bebidas' });
    expect(title).not.toBe(null);
  });

  it('must remove "/" from title', () => {
    const history = createMemoryHistory();
    history.push('/bebidas/');
    const { queryByRole } = render(
      <RecipesAppProvider>
        <Router history={ history }>
          <Header />
        </Router>
      </RecipesAppProvider>,
    );

    const title = queryByRole('heading', { level: 1, name: 'Bebidas' });
    expect(title).not.toBe(null);
  });

  it('should replace "area" from url with "Origem"', () => {
    const history = createMemoryHistory();
    history.push('/explorar/comidas/area');
    const { queryByRole } = render(
      <RecipesAppProvider>
        <Router history={ history }>
          <Header />
        </Router>
      </RecipesAppProvider>,
    );

    const title = queryByRole('heading', { level: 1, name: 'Explorar Origem' });
    expect(title).not.toBe(null);
  });
});
