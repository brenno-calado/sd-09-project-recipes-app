import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import '../Styles/Profile.css';

class Profile extends React.Component {
  render() {
    const LogOut = () => {
      const { history } = this.props;
      localStorage.removeItem('user');
      history.push('/');
    };

    const { email } = this.props;
    return (
      <div className="profileContainer">
        <header className="headerContainer">
          <img
            src={ profileIcon }
            alt="Profile Icon"
            data-testid="profile-top-btn"
          />
          <span data-testid="page-title">Perfil</span>
        </header>
        <main>
          <span data-testid="profile-email">
            email:
            { email }
          </span>
          <div className="buttons">
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ LogOut }
            >
              Sair
            </button>
          </div>
        </main>
      </div>
    );
  }
}

Profile.propTypes = {
  email: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ email: state.User.email });

export default connect(mapStateToProps, null)(Profile);
