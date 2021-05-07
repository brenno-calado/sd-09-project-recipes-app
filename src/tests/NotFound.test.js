import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Testes tela NotFound', () => {
  it('O texto Not Found está presente na tela', () => {
    render(<NotFound />);

    const notFoundText = screen.getByText(/not found/i);

    expect(notFoundText).toBeInTheDocument();
  });
});
