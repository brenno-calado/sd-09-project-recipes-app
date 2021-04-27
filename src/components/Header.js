import React from 'react';

function Header() {
  return (
    <header>
      <button type="button" data-testid="profile-top-btn">User</button>
      <h1 data-testid="page-title">Comidas</h1>
      <button type="button" data-testid="search-top-btn">Pesquisar</button>
    </header>
  );
}

export default Header;
