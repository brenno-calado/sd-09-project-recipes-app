import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { Explore, Login } from '../pages';

describe('Explore page', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<Login />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);
    history.push('/explorar');
  });
  afterEach(() => jest.clearAllMocks());

  it('should be on the route \'/explorar\'', () => {
    const { history } = renderWithRouter(<Explore />, '/explorar');

    expect(history.location.pathname).toBe('/explorar');
  });
  it('should have an two buttons to explore', () => {
    const { getByTestId } = renderWithRouter(<Explore />, '/explorar');
    const foodButton = getByTestId('explore-food');
    const drinkButton = getByTestId('explore-drinks');

    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(foodButton.textContent).toContain('Explorar Comidas');
    expect(drinkButton.textContent).toContain('Explorar Bebidas');
  });

  it('Should change route to  \'/explorar/comidas\' on click correct button', () => {
    const { history, getByTestId } = renderWithRouter(<Explore />, '/explorar');
    const foodButton = getByTestId('explore-food');
    fireEvent.click(foodButton);

    expect(history.location.pathname).toBe('/explorar/comidas');
  });

  it('Should change route to  \'/explorar/bebidas\' on click correct button', () => {
    const { history, getByTestId } = renderWithRouter(<Explore />, '/explorar');
    const drinksButton = getByTestId('explore-drinks');
    fireEvent.click(drinksButton);

    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
});
