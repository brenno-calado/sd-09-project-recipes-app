import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import rootReducer from '../../redux/reducers';

const renderWithRedux = (component, initialState = {}) => {
  const store = createStore(rootReducer, initialState);
  return {
    ...render(<Provider store={ store }>{ component }</Provider>, store),
  };
};

export default renderWithRedux;
