import React from 'react';
import renderWithRouter from './tests/renderWithRouter';
import App from './App';

test('Farewell, front-end', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkElement = getByText(/ENTRAR/i);
  expect(linkElement).toBeInTheDocument();
});
