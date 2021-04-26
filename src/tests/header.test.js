import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa componente SearchBar', () => {
  it('Os inputs são mostrados na tela', () => {
    const { getByTestId, getByLabelText } = renderWithRouter(<App />);

    // inserir os passos do login até cair na home onde temos o header

    const inputTextSearch = getByLabelText(/Buscar por:/i);

    expect(inputTextSearch).toBeInTheDocument();
    expect(getByLabelText(/Ingredient/i)).toBeInTheDocument();
    expect(getByLabelText(/Name/i)).toBeInTheDocument();
    expect(getByLabelText(/First Letter/i)).toBeInTheDocument();
    expect(getByTestId(/exec-search-btn/i)).toBeInTheDocument();
  });

  it('Inputs devem receber valor, e apenas um input radio deve ser selecionado', () => {
    const { getByLabelText } = renderWithRouter(<App />);

    const inputTextSearch = getByLabelText(/Buscar por:/i);
    const inputRadioIndredient = getByLabelText(/Ingredient/i);
    const inputRadioNameSearch = getByLabelText(/Name/i);

    userEvent.type(inputTextSearch, 'hamburguer');
    expect(inputTextSearch).toHaveValue('hamburguer');
    userEvent.click(inputRadioNameSearch);
    expect(inputRadioNameSearch).toBeChecked();
    userEvent.click(inputRadioIndredient);
    expect(inputRadioIndredient).toBeChecked();
    expect(inputRadioNameSearch).not.toBeChecked();
  });
});
