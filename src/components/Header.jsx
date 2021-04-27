import React, { useState } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ props }) {
  const [xablau, setXablau] = useState(false);

  const handleClick = () => {
    setXablau(!xablau);
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

  const comidas = () => (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Comidas</p>
        { buttonClick() }
      </div>
      <div>
        { xablau ? <SearchBar /> : null }
      </div>
    </>
  );

  const explorar = () => (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Explorar</p>
      </div>
      <div>
        { xablau ? <SearchBar /> : null }
      </div>
    </>
  );

  const perfil = () => (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Perfil</p>
      </div>
      <div>
        { xablau ? <SearchBar /> : null }
      </div>
    </>
  );

  const bebidas = () => (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Bebidas</p>
        { buttonClick() }
      </div>
      <div>
        { xablau ? <SearchBar /> : null }
      </div>
    </>
  );

  const receitasFavoritas = () => (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Receitas Favoritas</p>
      </div>
      <div>
        { xablau ? <SearchBar /> : null }
      </div>
    </>
  );

  const receitasFeitas = () => (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Receitas Feitas</p>
      </div>
      <div>
        { xablau ? <SearchBar /> : null }
      </div>
    </>
  );

  const explorarComidas = () => (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Explorar Comidas</p>
      </div>
      <div>
        { xablau ? <SearchBar /> : null }
      </div>
    </>
  );

  const explorarBebidas = () => (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Explorar Bebidas</p>
      </div>
      <div>
        { xablau ? <SearchBar /> : null }
      </div>
    </>
  );

  const comidasPorIngredientes = () => (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Explorar Ingredientes</p>
      </div>
      <div>
        { xablau ? <SearchBar /> : null }
      </div>
    </>
  );

  const bebidasPorIngredientes = () => (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Explorar Ingredientes</p>
      </div>
      <div>
        { xablau ? <SearchBar /> : null }
      </div>
    </>
  );

  const comidaOrigem = () => (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Explorar Origem</p>
        { buttonClick() }
      </div>
      <div>
        { xablau ? <SearchBar /> : null }
      </div>
    </>
  );

  switch (props.match.path) {
  case '/comidas':
    return comidas();

  case '/explorar':
    return explorar();

  case '/bebidas':
    return bebidas();

  case '/perfil':
    return perfil();

  case '/receitas-favoritas':
    return receitasFavoritas();

  case '/receitas-feitas':
    return receitasFeitas();

  case '/explorar/comidas':
    return explorarComidas();

  case '/explorar/bebidas':
    return explorarBebidas();

  case '/explorar/comidas/ingredientes':
    return comidasPorIngredientes();

  case '/explorar/bebidas/ingredientes':
    return bebidasPorIngredientes();

  case '/explorar/comidas/area':
    return comidaOrigem();

  default:
    break;
  }
}

export default Header;
