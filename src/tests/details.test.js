import React from 'react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Api from '../services/api';

describe('33 - Implemente os elementos da tela de detalhes de receita', () => {
  it('A tela de comida possui todos os atributos data-testid', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('http://localhost:3000/comidas/52771');

    const addMock = jest.spyOn(Api, 'fetchOneMeal');

    expect(addMock).toHaveBeenCalled();
    expect(getByTestId('recipe-photo')).toBeInTheDocument();
    expect(getByTestId('recipe-title')).toBeInTheDocument();
    expect(getByTestId('share-btn')).toBeInTheDocument();
    expect(getByTestId('favorite-btn')).toBeInTheDocument();
    expect(getByTestId('recipe-category')).toBeInTheDocument();
    expect(getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
    expect(getByTestId('instructions')).toBeInTheDocument();
    expect(getByTestId('video')).toBeInTheDocument();
    expect(getByTestId('0-recomendation-card')).toBeInTheDocument();
    expect(getByTestId('start-recipe-btn')).toBeInTheDocument();
  });
});
