import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import Header from '../common/components/Header';

describe('Testes do componente Header', () => {
  it('deve conter uma tag header', () => {
    const { getByTestId } = renderWithRouter(<Header />);
    const header = getByTestId('test-header');
    expect(header).toBeDefined();
  });
});
