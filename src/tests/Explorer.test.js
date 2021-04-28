import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { Explore } from '../pages';

describe('Explore page', () => {
  it('should be on the route \'/explorar\'', () => {
    const { history } = renderWithRouter(<Explore />);
    expect(history.location.pathname).toBe('/explorar');
  });

  it('should have 2 buttons with correct text', () => {
    renderWithRouter(<Explore />, '/');
    const email = screen.getByTestId(emailId);
    const password = screen.getByTestId(passId);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
});
