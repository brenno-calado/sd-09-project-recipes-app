import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';

import rootReducer from '../redux/reducers';

export default function renderWithRedux(
  component,
  initialState = {},
) {
  const store = createStore(rootReducer, initialState);
  return {
    ...render(
      <Provider store={ store }>
        {component}
      </Provider>,
    ),
    store,
  };
}