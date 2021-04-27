import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { Login } from '../pages';

afterEach(() => jest.clearAllMocks());

describe('Login page', () => {
  const emailId = 'email-input';
  const passId = 'password-input';
  const btnId = 'login-submit-btn';

  it('should be on the route \'/\'', () => {
    const { history } = renderWithRouter(<Login />);
    expect(history.location.pathname).toBe('/');
  });

  it('should have a field for the user to enter email and password', () => {
    renderWithRouter(<Login />, '/');
    const email = screen.getByTestId(emailId);
    const password = screen.getByTestId(passId);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
  it('Should have a submit button', () => {
    renderWithRouter(<Login />, '/');

    const button = screen.getByTestId(btnId);
    expect(button).toBeInTheDocument();
  });

  it('should enable the button if all fields are valid', () => {
    renderWithRouter(<Login />, '/');

    const button = screen.getByTestId(btnId);
    expect(button).toBeDisabled();

    const email = screen.getByTestId(emailId);
    const senha = screen.getByTestId(passId);

    userEvent.type(email, 'email');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'email@com@');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'emailcom@');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'ex@email.com');
    userEvent.type(senha, '23456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    expect(button).toBeEnabled();
  });
  it('should save email and 2 tokens on local storage when submitting', () => {
    renderWithRouter(<Login />, '/');

    const email = screen.getByTestId(emailId);
    const senha = screen.getByTestId(passId);
    const button = screen.getByTestId(btnId);

    userEvent.type(email, 'exemplo@email.com');
    userEvent.type(senha, '1234567');
    fireEvent.click(button);

    expect(localStorage.getItem('cocktailsToken')).toBe('1');
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('user')).toBe('{"email":"exemplo@email.com"}');
  });
  it('should change the route to \'/comidas\' after clicking the button.', () => {
    const { history } = renderWithRouter(<Login />, '/');
    const email = screen.getByTestId(emailId);
    const senha = screen.getByTestId(passId);
    const button = screen.getByTestId(btnId);

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/comidas');
  });
});
