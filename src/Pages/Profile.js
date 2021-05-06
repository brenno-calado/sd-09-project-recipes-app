import React, { Component } from 'react';
import '../styles/Profile.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FooterSpec from '../components/FooterSpec';

class Profile extends Component {
  constructor() {
    super();
    this.exitAndClearLocalStorage = this.exitAndClearLocalStorage.bind(this);
  }

  exitAndClearLocalStorage() {
    localStorage.clear();
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    let notEmail = 'email@mail.com';
    if (user) {
      const { email } = user;
      notEmail = email;
    }
    return (
      <div>
        <Header titleHeader="Perfil" id="1" />
        <div className="profile-main">
          <p
            data-testid="profile-email"
            className="profile-email"
          >
            { notEmail }
          </p>
          <Link to="/receitas-feitas">
            <button
              className="profile-button"
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link to="/receitas-favoritas">
            <button
              className="profile-button"
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link to="/">
            <button
              className="profile-button"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ this.exitAndClearLocalStorage }
            >
              Sair
            </button>
          </Link>
        </div>
        <FooterSpec />
      </div>
    );
  }
}

export default Profile;
