import React from 'react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const emailId = 'email-input';
const passwordId = 'password-input';
const loginBtnId = 'login-submit-btn';
const validEmailInput = 'email@email.com';

describe('2 - Os elementos devem respeitar os atributos descritos', () => {
  it('O input de email deve possuir o atributo data-testid="email-input"', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    expect(getByTestId(emailId)).toBeInTheDocument();
  });

  it('O input de senha deve possuir o atributo data-testid="password-input"', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    expect(getByTestId(passwordId)).toBeInTheDocument();
  });

  it('O botão "Entrar" deve possuir o atributo data-testid="login-submit-btn"', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    expect(getByTestId(loginBtnId)).toBeInTheDocument();
    expect(getByTestId(loginBtnId)).toContainHTML('Entrar');
  });
});

describe('3 - A pessoa deve conseguir escrever seu email no input de email', () => {
  it('É possível escrever o email', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(emailId);
    userEvent.type(emailInput, validEmailInput);
    expect(emailInput).toHaveValue(validEmailInput);
  });
});

describe('4 - A pessoa deve conseguir escrever sua senha no input de senha', () => {
  it('É possível escrever a senha', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const passwordInput = getByTestId(passwordId);
    const passwordValue = '1234567';
    userEvent.type(passwordInput, passwordValue);
    expect(passwordInput).toHaveValue(passwordValue);
  });
});

describe('5 - O form é válido após email válido e senha de mais de 6 caracteres', () => {
  it('O botão deve estar desativado se o email for inválido', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(emailId);
    const inputValue = 'email';

    userEvent.type(emailInput, inputValue);
    expect(getByTestId(loginBtnId)).toBeDisabled();
  });

  it('O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const passwordInput = getByTestId(passwordId);
    const passwordValue = '123';

    userEvent.type(passwordInput, passwordValue);
    expect(getByTestId(loginBtnId)).toBeDisabled();
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(emailId);
    const passwordInput = getByTestId(passwordId);
    const passwordValue = '1234567';

    userEvent.type(emailInput, validEmailInput);
    userEvent.type(passwordInput, passwordValue);
    expect(getByTestId(loginBtnId)).toBeEnabled();
  });
});

// FALTA OS TESTES 6 E 7 (LOCAL STORAGE)
// PQ O 8 NÃO PASSA?
describe('8 - Redirecione para /comidas após o login', () => {
  it('A rota muda para a tela principal de receitas de comidas', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId(emailId);
    const passwordInput = getByTestId(passwordId);
    const passwordValue = '1234567';
    const loginBtn = getByTestId(loginBtnId);
    const { pathname } = history.location;

    userEvent.type(emailInput, validEmailInput);
    userEvent.type(passwordInput, passwordValue);
    userEvent.click(loginBtn);
    expect(pathname).toBe('/comidas');
  });
});
