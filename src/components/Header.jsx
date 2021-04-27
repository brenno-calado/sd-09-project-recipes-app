import React, { useState } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import {
  comidaOrigem,
  bebidasPorIngredientes,
  comidasPorIngredientes,
  explorarBebidas,
  explorarComidas,
  receitasFeitas,
  receitasFavoritas,
  bebidas,
  comidas,
  perfil,
  explorar,
} from './ComplementHeader';

function Header({ props }) {
  const [isSearchBar, setSerachBar] = useState(false);

  const handleClick = () => {
    setSerachBar(!isSearchBar);
  };

  const buttonLink = () => (
    <Link to="/perfil">
      <input
        data-testid="profile-top-btn"
        type="image"
        src={ profileIcon }
        alt="profileIcon"
      />
    </Link>
  );

  const buttonClick = () => (
    <input
      data-testid="search-top-btn"
      type="image"
      src={ searchIcon }
      alt="searchIcon"
      onClick={ handleClick }
    />
  );

  switch (props.match.path) {
  case '/comidas':
    return comidas(buttonLink, buttonClick, isSearchBar);

  case '/explorar':
    return explorar(buttonLink);

  case '/bebidas':
    return bebidas(buttonLink);

  case '/perfil':
    return perfil(buttonLink, buttonClick, isSearchBar);

  case '/receitas-favoritas':
    return receitasFavoritas(buttonLink);

  case '/receitas-feitas':
    return receitasFeitas(buttonLink);

  case '/explorar/comidas':
    return explorarComidas(buttonLink);

  case '/explorar/bebidas':
    return explorarBebidas(buttonLink);

  case '/explorar/comidas/ingredientes':
    return comidasPorIngredientes(buttonLink);

  case '/explorar/bebidas/ingredientes':
    return bebidasPorIngredientes(buttonLink);

  case '/explorar/comidas/area':
    return comidaOrigem(buttonLink, buttonClick, isSearchBar);

  default:
    break;
  }
}

export default Header;
