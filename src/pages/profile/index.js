import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';

import './styles.css';

class index extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
    this.getUserEmail = this.getUserEmail.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.getUserEmail();
  }

  getUserEmail() {
    const userData = JSON.parse(localStorage.getItem('user'));
    const { email } = userData;
    this.setState({
      email,
    });
  }

  logout() {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  }

  render() {
    const { email } = this.state;
    return (
      <div>
        <Header title="Perfil" iconSearch="hidden" />
        <div className="profile-screen">
          <h4 data-testid="profile-email">{ email }</h4>
          <Link to="/receitas-feitas">
            <button type="button" data-testid="profile-done-btn">
              Receitas Feitas
            </button>
          </Link>
          <Link to="/receitas-favoritas">
            <button type="button" data-testid="profile-favorite-btn">
              Receitas Favoritas
            </button>
          </Link>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ this.logout }
          >
            Sair
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}

index.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default index;
