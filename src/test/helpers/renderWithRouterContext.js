import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from '../../context';

const renderWithRouterContext = (ui, { propProvider, ...renderOptions }) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Provider { ...propProvider }>
        <Router history={ history }>
          {ui}
        </Router>
      </Provider>,
    ),
    renderOptions,
    history,
  });
};

export default renderWithRouterContext;
