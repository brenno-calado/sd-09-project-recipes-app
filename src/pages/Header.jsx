import React from 'react';

function createHeader() {
  return (
    <header>
      <button data-testid="profile-top-btn" type="button">
        TESTE
      </button>
      <h1 data-testid="page-title">Trybe Receitas</h1>
      <button data-testid="search-top-btn" type="button">X</button>
    </header>
  );
}

export default createHeader;
