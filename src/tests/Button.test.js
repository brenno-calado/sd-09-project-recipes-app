import React from 'react';
import Button from '../common/components/buttons/Button';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente Button', () => {
  it('deve conter uma tag button', () => {
    const { getByRole } = renderWithRouter(<Button />);
    const button = getByRole('button');
    expect(button).toBeDefined();
  });
});
