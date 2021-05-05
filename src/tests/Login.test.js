import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('1 - Testes da Pagina de login', () => {
  it('A rota "/" deve renderizar a pagina de login', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toEqual('/');
  });

  it('A pagina de login deve conter um campo de email', () => {
    const { getByPlaceholderText } = renderWithRouter(<App />);
    const emailInput = getByPlaceholderText('E-mail');
    expect(emailInput).toBeInTheDocument();
  });

  it('A pagina de login deve conter um campo de senha', () => {
    const { getByPlaceholderText } = renderWithRouter(<App />);
    const emailInput = getByPlaceholderText('Senha');
    expect(emailInput).toBeInTheDocument();
  });

  it('A pagina de login deve conter um botão para submit', () => {
    const { getByRole } = renderWithRouter(<App />);
    const submitButton = getByRole('button');
    expect(submitButton).toHaveTextContent('Entrar');
    expect(submitButton).toBeInTheDocument();
  });

  it('A pagina de login não contém o componente Header', () => {
    const { queryByTestId } = renderWithRouter(<App />);
    const header = queryByTestId('test-header');
    expect(header).toBeNull();
  });

  it('O email de login deve ser salvo no localStorage, na chave "user"', () => {
    localStorage.clear();
    // const { getByPlaceholderText } = renderWithRouter(<App />);
  });
});
