import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

describe('Tela de Login', () => {
  const EMAIL_TEST_ID = 'email-input';
  const PASS_TEST_ID = 'password-input';
  const BTN_TEST_ID = 'login-submit-btn';

  it('Verifica se os inputs de email e senha estão na pagina de login', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(EMAIL_TEST_ID);
    const passwordInput = getByTestId(PASS_TEST_ID);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('Verifica se é possível escrever o email e a senha', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(EMAIL_TEST_ID);
    const passwordInput = getByTestId(PASS_TEST_ID);

    userEvent.type(emailInput, 'email');
    expect(emailInput).toHaveValue('email');

    userEvent.type(passwordInput, '12345');
    expect(passwordInput).toHaveValue('12345');
  });

  it('Verifica se o botão fica desativado enquanto o formulário é inválido', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(EMAIL_TEST_ID);
    const passwordInput = getByTestId(PASS_TEST_ID);
    const button = getByTestId(BTN_TEST_ID);

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');

    userEvent.type(emailInput, 'email');
    userEvent.type(passwordInput, '123456');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'email5@gmail.com');
    userEvent.type(passwordInput, '123456');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'email');
    userEvent.type(passwordInput, '1234567');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'email5@gmail.com');
    userEvent.type(passwordInput, '1234567');
    expect(button).toBeEnabled();
  });

  it('Verifica se os tokens são salvos no local storage', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(EMAIL_TEST_ID);
    const passwordInput = getByTestId(PASS_TEST_ID);
    const button = getByTestId(BTN_TEST_ID);

    userEvent.type(emailInput, 'email4@gmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(button);

    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
  });

  it('Verifica se o e-mail do usuário é salvo no localStorage na chave user', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const emailInput = getByTestId(EMAIL_TEST_ID);
    const passwordInput = getByTestId(PASS_TEST_ID);
    const button = getByTestId(BTN_TEST_ID);

    userEvent.type(emailInput, 'email@gmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(button);

    expect(JSON.parse(localStorage.getItem('user')).email).toBe('email@gmail.com');
  });

  it('Verifica se o usuário é redirecionado para a tela principal de receitas', () => {
    const { getByTestId, history } = renderWithRouter(<Login />);

    const emailInput = getByTestId(EMAIL_TEST_ID);
    const passwordInput = getByTestId(PASS_TEST_ID);
    const button = getByTestId(BTN_TEST_ID);

    userEvent.type(emailInput, 'email2@gmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/comidas');
  });
});
