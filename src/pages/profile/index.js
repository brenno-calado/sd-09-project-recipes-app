import React, { Component } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';

class index extends Component {
  render() {
    return (
      <div>
        <Header title="Perfil" iconSearch="hidden" />
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
        <Footer />
      </div>
    );
  }
}

export default index;
