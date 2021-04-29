import React, { Component } from 'react';

class index extends Component {
  render() {
    return (
      <div>
        <header>Perfil</header>
        <h1 data-testid="profile-email">userEmail</h1>
        <button type="button" data-testid="profile-done-btn">
          Receitas Feitas
        </button>
        <button type="button" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </button>
        <button type="button" data-testid="profile-logout-btn">
          Sair
        </button>
      </div>
    );
  }
}

export default index;
