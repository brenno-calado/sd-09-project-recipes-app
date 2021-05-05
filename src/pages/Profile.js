import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

class Perfil extends React.Component {
  render() {
    const getEmail = JSON.parse(localStorage.getItem('user'));
    const { history } = this.props;
    return (
      <div>
        <Header title="Perfil" />
        <div>
          <h3 data-testid="profile-email">{getEmail && getEmail.email}</h3>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/receitas-feitas') }
          >
            Receitas Feitas
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/receitas-favoritas') }
          >
            Receitas Favoritas
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => { history.push('/'); localStorage.clear(); } }
          >
            Sair
          </button>
        </div>
        <FooterMenu />
      </div>
    );
  }
}

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Perfil;
