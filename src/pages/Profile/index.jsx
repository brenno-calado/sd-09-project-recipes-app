import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toHome: false,
      toDone: false,
      toFavorite: false,
    };
    this.exitProfile = this.exitProfile.bind(this);
  }

  exitProfile() {
    this.setState({ toHome: true });
    localStorage.clear();
  }

  render() {
    const { toHome, toDone, toFavorite } = this.state;
    const userEmail = (localStorage.getItem.length > 0)
      ? JSON.parse(localStorage.getItem('user')) : '';

    return (
      <>
        { (toHome) ? <Redirect to="/" /> : '' }
        { (toDone) ? <Redirect to="/receitas-feitas" /> : '' }
        { (toFavorite) ? <Redirect to="/receitas-favoritas" /> : '' }
        <Header title="Perfil" />
        <h3
          data-testid="profile-email"
        >
          { (userEmail === null) ? '' : userEmail.email }
        </h3>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => this.setState({ toDone: true }) }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => this.setState({ toFavorite: true }) }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => this.exitProfile() }
        >
          Sair
        </button>
        <Footer />
      </>
    );
  }
}

export default Profile;
