import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Login Page', () => {
  const USER_INPUT_SELECTOR = 'email-input';
  const PASSWORD_INPUT_SELECTOR = 'password-input';
  const BUTTON_SELECTOR = 'login-submit-btn';

  it('Verifica se o input email, password e botao estao na pagina de login', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId(USER_INPUT_SELECTOR);
    const passwordInput = getByTestId(PASSWORD_INPUT_SELECTOR);
    const button = getByTestId(BUTTON_SELECTOR);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('É possivel escrever no input de e-mail', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const emailInput = getByTestId(USER_INPUT_SELECTOR);
    const testString = 'alguem@gmail.com.br';
    const button = getByTestId(BUTTON_SELECTOR);
    const { pathname: login } = history.location;

    userEvent.type(emailInput, testString);

    expect(emailInput).toHaveValue(testString);
    expect(login).toBe('/');
    expect(button).toBeDisabled();
  });

  it('É possivel escrever no input de senha', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const passwordInput = getByTestId(PASSWORD_INPUT_SELECTOR);
    const testString = '1234567';
    const button = getByTestId(BUTTON_SELECTOR);
    const { pathname: login } = history.location;

    userEvent.type(passwordInput, testString);

    expect(passwordInput).toHaveValue(testString);
    expect(login).toBe('/');
    expect(button).toBeDisabled();
  });

  it('Botão desabilitado quando senha e user não atendem a validação', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(USER_INPUT_SELECTOR);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_SELECTOR);
    const testStringWrong = { user: 'alguem', senha: '123456' };
    const testStringWrong2 = { user: 'someone@hotmail', senha: '1234567' };

    userEvent.type(passwordInput, testStringWrong.senha);
    userEvent.type(emailInput, testStringWrong.user);
    const buttonCase1 = screen.getByTestId(BUTTON_SELECTOR);
    expect(buttonCase1).toBeDisabled();

    userEvent.type(passwordInput, testStringWrong2.senha);
    userEvent.type(emailInput, testStringWrong2.user);
    const buttonCase2 = screen.getByTestId(BUTTON_SELECTOR);
    expect(buttonCase2).toBeDisabled();
  });

  it('Testa se o botão é clicavel quando senha e user atendem a validação', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(USER_INPUT_SELECTOR);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_SELECTOR);
    const testStringPass = { user: 'alguem@gmail.com', senha: '12345678' };

    userEvent.type(emailInput, testStringPass.user);
    userEvent.type(passwordInput, testStringPass.senha);

    const button = screen.getByTestId(BUTTON_SELECTOR);

    expect(button).not.toBeDisabled();
  });

  it('Testa o redirecionamento da página para /comidas', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(USER_INPUT_SELECTOR);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_SELECTOR);
    const testStringPass = { user: 'alguem@gmail.com', senha: '12345678' };

    userEvent.type(emailInput, testStringPass.user);
    userEvent.type(passwordInput, testStringPass.senha);
    const button = screen.getByTestId(BUTTON_SELECTOR);
    expect(button).not.toBeDisabled();

    userEvent.click(button);

    const { pathname: mainPage } = history.location;
    expect(mainPage).toBe('/comidas');
  });
});
