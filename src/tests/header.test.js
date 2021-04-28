import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// em cada teste (it), inserir os passos do login até cair na home onde temos o header/searchbar renderizada
describe('13 - Implemente os elementos da barra de busca', () => {
  it('Os inputs são mostrados na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);

    expect(getByTestId('search-input')).toBeInTheDocument();
    expect(getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(getByTestId('name-search-radio')).toBeInTheDocument();
    expect(getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(getByTestId('exec-search-btn')).toBeInTheDocument();
  });
});

describe('14 -  implemente 3 radio buttons: Ingrediente, Nome e Primeira letra', () => {
  it('Inputs devem receber valor, e apenas um input radio deve ser selecionado', () => {
    const { getByLabelText } = renderWithRouter(<App />);

    const inputTextSearch = getByLabelText(/Buscar por:/i);
    const inputRadioIndredient = getByLabelText(/Ingrediente/i);
    const inputRadioNameSearch = getByLabelText(/Nome/i);

    userEvent.type(inputTextSearch, 'hamburguer');
    expect(inputTextSearch).toHaveValue('hamburguer');
    userEvent.click(inputRadioNameSearch);
    expect(inputRadioNameSearch).toBeChecked();
    userEvent.click(inputRadioIndredient);
    expect(inputRadioIndredient).toBeChecked();
    expect(inputRadioNameSearch).not.toBeChecked();
  });

  it('buscar por "primeira letra" deve emitir um alerta', () => {
    // const { getByTestId, getByLabelText } = renderWithRouter(<App />);

    // const inputTextSearch = getByLabelText(/Buscar por:/i);
    // const inputRadioPrimeiraLetra = getByLabelText(/Nome/i);
    // const buttonSearch = getByTestId(/exec-search-btn/i);

    // userEvent.type(inputTextSearch, 'ch');
    // userEvent.click(inputRadioPrimeiraLetra);
    // userEvent.click(buttonSearch);

    // CRIAR UM MOCK PRO ALERT
    // const addMock = jest.spyOn(window, 'alert');
    // addMock.mockImplementation(() => {});
    // expect(addMock()).toHaveBeenCalled();
  });

  it('Botao search deve disparar um request a api', () => {
    // CRIAR MOCK PARA REQUISIÇÔES

    // const addMock = jest.spyOn(Api, 'fetchMeal');
    // addMock.mockImplementation(() => 'called');

    // expect(addMock()).toBe('called');
    // expect(addMock).toHaveBeenCalled();
  });
});

describe('15 - Busque na API corretamente, referente a página bebidas/comidas', () => {
  it('Verifica em qual pagina está e faz requisição', () => {
    // CRIAR MOCK PARA REQUISIÇÔES
  });
});
