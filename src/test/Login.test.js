import React from 'react';
import useEvent from '@testing-library/user-event';
import renderWithRouterContext from './helpers/renderWithRouterContext';
import App from '../App';

const propsProvider = {
  data: [],
  updateData: async (api) => setData(await api),
  disableButton: false,
};

const dataTestsIds = {
  loginSubmitBtn: 'login-submit-btn',
  emailInput: 'email-input',
  passwordInput: 'password-input',
};

describe('Tela de Login', () => {
  it('Verifica se a tela de login é renderizada na rota `/`', () => {
    const { getByText, history } = renderWithRouterContext(<App />, { propsProvider });
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(getByText('Entrar')).toBeInTheDocument();
  });

  it('Verifica se os inputs e o button estão presentes na tela', () => {
    const { getByTestId } = renderWithRouterContext(<App />, { propsProvider });

    const buttonLogin = getByTestId(dataTestsIds.loginSubmitBtn);

    expect(getByTestId(dataTestsIds.emailInput)).toBeInTheDocument();
    expect(getByTestId(dataTestsIds.passwordInput)).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });

  it('Verifica se o botão `Login` é habilitado/desabilitado com os dados dos inputs',
    () => {
      const { getByTestId } = renderWithRouterContext(<App />, { propsProvider });
      const emailInput = getByTestId(dataTestsIds.emailInput);
      const passwordInput = getByTestId(dataTestsIds.passwordInput);
      const button = getByTestId(dataTestsIds.loginSubmitBtn);

      useEvent.type(emailInput, 'email');
      useEvent.type(passwordInput, '124');
      expect(button.disabled).toBeTruthy();

      useEvent.type(emailInput, 'email@email.com');
      useEvent.type(passwordInput, '124578742');
      expect(button.disabled).toBeFalsy();
    });

  it('Verifica se a função logar está funcionando', () => {
    const { getByTestId,
      getByText } = renderWithRouterContext(<App />, { propsProvider });
    const emailInput = getByTestId(dataTestsIds.emailInput);
    const passwordInput = getByTestId(dataTestsIds.passwordInput);
    const button = getByTestId(dataTestsIds.loginSubmitBtn);

    useEvent.type(emailInput, 'email@email.com');
    useEvent.type(passwordInput, '124578742');
    useEvent.click(button);
    expect(getByText(/Comidas/ig)).toBeInTheDocument();
  });
});
