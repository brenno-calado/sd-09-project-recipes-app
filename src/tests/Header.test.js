import React from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
// import renderWithRouter from './renderWithRouter';
import renderWithRedux from './renderWithRedux';
import Meals from '../pages/Meals';
// import Cocktails from '../pages/Cocktails';
// import Login from '../pages/Login';

describe('Testa o Header a partir da page de comidas', () => {
  const renderWithRouter = (initialEntries = ['/']) => (
    <Router history={ createMemoryHistory({ initialEntries }) }>
      <Meals />
    </Router>
  );

  test('', () => {
    const INITIAL_STATE = {
      pathname: '/comidas',
      isFetching: false,
      data: [],
      error: '',
      isFetched: false,
      recipeType: '',
    };
    const { getByText, getByTestId, getByRole } = renderWithRedux(
      renderWithRouter(['/comidas']),
      { loginReducer: INITIAL_STATE },
    );

    const mailsTitles = getByText('Comidas');
    expect(mailsTitles).toBeInTheDocument();
  });

});
