import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../Common/RenderWithRouter';
import Header from '../Common/Components/Header';

// criar testes para o componente header

describe('Testando componente Header', () => {
  it(`9 - Implemente os elementos do header na tela principal de receitas,
  respeitando os atributos descritos no protótipo`, () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
  });

  // it(`10 - Implemente um ícone para a tela de perfil,
  // um título e um ícone para a busca, caso exista no protótipo`, () => {
  //   const { getByRole } = RenderWithRouter(<App/>);
  //   expect(getByRole('link', { data-testid: ''}))
  // });

  it(`11 - Redirecione a pessoa usuária para a tela
    de perfil ao clicar no botão de perfil`, () => {
    const { getByTestId, findByText } = RenderWithRouter(<Header />);
    userEvent.click(getByTestId('profile-top-btn'));
    expect(findByText('Profile')).toBeInTheDocument();
  });

  it(`12 - Desenvolva o botão de busca que, ao ser clicado, a barra de busca deve aparecer
  O mesmo serve para escondê-la`, () => {
    const { getByRole, getByTestId } = RenderWithRouter(<Header />);
    userEvent.click(getByRole('button'));
    expect(getByTestId('search-input')).toBeInTheDocument();
    expect(getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(getByTestId('name-search-radio')).toBeInTheDocument();
    expect(getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(getByTestId('exec-search-btn')).toBeInTheDocument();

    userEvent.click(getByRole('button', { name: 'search-top-btn' }));
    expect(getByTestId('search-input')).not.toBeInTheDocument();
    expect(getByTestId('ingredient-search-radio')).not.toBeInTheDocument();
    expect(getByTestId('name-search-radio')).not.toBeInTheDocument();
    expect(getByTestId('first-letter-search-radio')).not.toBeInTheDocument();
    expect(getByTestId('exec-search-btn')).not.toBeInTheDocument();
  });
});
