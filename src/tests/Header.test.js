import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';

describe('Component HeaderPS', () => {
  test('there is profile btn element', () => {
    renderWithRouter(<Header />);

    const profileTopBtn = screen.getByTestId('profile-top-btn');
    expect(profileTopBtn).toBeInTheDocument();
  });

  test('the title is rendered', () => {
    renderWithRouter(<Header />);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  test('there is search btn element', () => {
    renderWithRouter(<Header />);

    const searchTopBtn = screen.getByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();
  });
});
