import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndStore } from './testRender';
import Login from '../Pages/Login';

describe('Login teste', () => {
  test('Verifica se renderizou a pagina de Login', () => {
    const { getByText } = renderWithRouterAndStore(<Login />);
    const title = getByText(/TRYBE/i);

    expect(title).toBeInTheDocument();
  });

  test('Tem dois input', () => {
    const { container } = renderWithRouterAndStore(<Login />);
    const allInput = container.querySelectorAll('input');

    expect(allInput.length).toBe(2);
    expect(allInput[0].type).toBe('text');
    expect(allInput[1].type).toBe('password');
  });

  test('Tem um button para logar', () => {
    const { getByTestId, container } = renderWithRouterAndStore(<Login />);
    const button = getByTestId('login-submit-btn');
    const allInput = container.querySelectorAll('input');

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Entrar');
    expect(button).toBeDisabled();

    userEvent.type(allInput[0], 'test');
    userEvent.type(allInput[1], '123456');
    expect(button).toBeDisabled();

    userEvent.type(allInput[0], 'test@com@');
    userEvent.type(allInput[1], '123456');
    expect(button).toBeDisabled();

    userEvent.type(allInput[0], 'testcom@');
    userEvent.type(allInput[1], '123456');
    expect(button).toBeDisabled();

    userEvent.type(allInput[0], 'test@test.');
    userEvent.type(allInput[1], '123456');
    expect(button).toBeDisabled();

    userEvent.type(allInput[0], 'test@test.com');
    userEvent.type(allInput[1], '1234567');
    expect(button).toBeEnabled();

    fireEvent.click(button);

    const localUser = localStorage.getItem('user');
    const localMeal = localStorage.getItem('mealsToken');
    const localCocktail = localStorage.getItem('cocktailsToken');

    expect(localUser).toContain('test@test.com');
    expect(localMeal).toContain(1);
    expect(localCocktail).toContain(1);
  });
});
