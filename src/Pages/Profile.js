import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import '../Styles/Profile.css';
import Footer from '../Components/Footer';

class Profile extends React.Component {
  render() {
    const LogOut = () => {
      const { history } = this.props;
      localStorage.clear();
      history.push('/');
    };
    const email = localStorage.getItem('user');
    const newUser = JSON.parse(localStorage.getItem('newUser'));
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
        <main className="mainContainer">
          {!email && newUser
            ? (
              <div className="NewUserDataProfile">
                <h1>{`Bem Vindo(a) ${newUser.nickName}!`}</h1>
                <p className="userInfo">Informações de Cadastro</p>
                <br />
                <p>{`Nome: ${newUser.name}`}</p>
                <p data-testid="profile-email">{`e-mail: ${newUser.mail}`}</p>
                <p>{`Endereço: ${newUser.street}, nº ${newUser.house}`}</p>
                <p>
                  {`Bairro: ${newUser.neighborhood},
                   ${newUser.state}
                    - ${newUser.country}` }
                </p>
                <hr />
              </div>
            )
            : (
              <div className="userDataProfile">
                <p className="userMail" data-testid="profile-email">{ email }</p>
              </div>
            ) }
          <div className="buttonsContainer">
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              <Link to="/receitas-feitas">
                Receitas Feitas
              </Link>
            </button>
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              <Link to="/receitas-favoritas">
                Receitas Favoritas
              </Link>
            </button>
            <button
              className="logOut"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ LogOut }
            >
              Sair
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({ email: state.User.email });

export default connect(mapStateToProps, null)(Profile);
