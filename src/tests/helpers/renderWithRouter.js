import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import RecipesAppProvider from '../../context/RecipesAppProvider';

const renderWithRouter = (component, route = '/') => {
  const history = createMemoryHistory();
  history.push(route);
  return ({
    ...render(
      <RecipesAppProvider>
        <Router history={ history }>
          {component}
        </Router>
      </RecipesAppProvider>,
    ),
    history,
  });
};

export default renderWithRouter;
