import React from 'react';
import SearchBar from './SearchBar';

function comidas(buttonLink, buttonClick, isSearchBar) {
  return (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Comidas</p>
        { buttonClick() }
      </div>
      <div>
        { isSearchBar ? <SearchBar /> : null }
      </div>
    </>
  );
}

function explorar(buttonLink) {
  return (
    <div className="header-content">
      { buttonLink() }
      <p data-testid="page-title">Explorar</p>
    </div>
  );
}

function perfil(buttonLink) {
  return (
    <div className="header-content">
      { buttonLink() }
      <p data-testid="page-title">Perfil</p>
    </div>
  );
}

function bebidas(buttonLink, buttonClick, isSearchBar) {
  return (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Bebidas</p>
        { buttonClick() }
      </div>
      <div>
        { isSearchBar ? <SearchBar /> : null }
      </div>
    </>
  );
}

function receitasFavoritas(buttonLink) {
  return (
    <div className="header-content">
      { buttonLink() }
      <p data-testid="page-title">Receitas Favoritas</p>
    </div>
  );
}

function receitasFeitas(buttonLink) {
  return (
    <div className="header-content">
      { buttonLink() }
      <p data-testid="page-title">Receitas Feitas</p>
    </div>
  );
}

function explorarComidas(buttonLink) {
  return (
    <div className="header-content">
      { buttonLink() }
      <p data-testid="page-title">Explorar Comidas</p>
    </div>
  );
}

function explorarBebidas(buttonLink) {
  return (
    <div className="header-content">
      { buttonLink() }
      <p data-testid="page-title">Explorar Bebidas</p>
    </div>
  );
}

function comidasPorIngredientes(buttonLink) {
  return (
    <div className="header-content">
      { buttonLink() }
      <p data-testid="page-title">Explorar Ingredientes</p>
    </div>
  );
}

function bebidasPorIngredientes(buttonLink) {
  const Explorar = 'Explorar Ingredientes';
  return (
    <div className="header-content">
      { buttonLink() }
      <p data-testid="page-title">{Explorar}</p>
    </div>
  );
}

function comidaOrigem(buttonLink, buttonClick, isSearchBar) {
  return (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Explorar Origem</p>
        { buttonClick() }
      </div>
      <div>
        { isSearchBar ? <SearchBar /> : null }
      </div>
    </>
  );
}

export {
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
};
