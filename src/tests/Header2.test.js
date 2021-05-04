import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Header2 from '../components/Header2';

describe('Component Header', () => {
  test('there is profile btn element', () => {
    renderWithRouter(<Header2 />);

    const profileTopBtn = screen.getByTestId('profile-top-btn');
    expect(profileTopBtn).toBeInTheDocument();
  });

  test('the title is rendered', () => {
    renderWithRouter(<Header2 />);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  test('there is no search btn element', () => {
    renderWithRouter(<Header2 />);

    const searchTopBtn = screen.getAllByRole('img');
    expect(searchTopBtn.length).toBe(1);
  });
});
