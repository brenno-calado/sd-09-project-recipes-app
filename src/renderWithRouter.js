import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import RecipesProvider from './context/RecipesContext';
import store from './store';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Provider store={ store }>
        {/* <RecipesProvider> */}
        <Router history={ history }>{component}</Router>
        {/* </RecipesProvider> */}
      </Provider>,
    ),
    history,
  });
};

export default renderWithRouter;
