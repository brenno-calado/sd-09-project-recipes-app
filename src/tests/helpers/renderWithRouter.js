import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../../App';

const renderWithRouter = (initialEntries = ['/']) => (
  <Router history={ createMemoryHistory({ initialEntries }) }>
    <App />
  </Router>
);

export default renderWithRouter;
