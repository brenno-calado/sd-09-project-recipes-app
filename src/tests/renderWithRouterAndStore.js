import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { render } from '@testing-library/react';

import rootReducer from '../redux/reducers/index';

export const getStore = (initialState) => {
  if (!initialState) return createStore(rootReducer, applyMiddleware(thunk));
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
};

export default function renderWithRouterAndStore
(
  component,
  routesConfig = {},
  initialState = {},
) {
  const route = routesConfig.route || '/';
  const store = getStore(initialState);
  const history = routesConfig.history
  || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>{component}</Router>
      </Provider>,
    ),
    store,
  };
}
