import React, { Component } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import rockGlass from '../images/rockGlass.svg';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      email: '',
      keyEmail: false,
      keyPassword: false,
    };
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleKeyPassword = this.handleKeyPassword.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
  }

  handleInputEmail({ target }) {
    const validateEmail = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(target.value);
    this.setState({
      email: target.value,
      keyEmail: validateEmail,
    });
    this.enableButton();
  }

  handleKeyPassword({ target }) {
    const six = 6;
    if (target.value.length >= six) {
      this.setState({
        keyPassword: true,
      });
    } else {
      this.setState({
        keyPassword: false,
      });
    }
    this.enableButton();
  }

  enableButton() {
    const { keyEmail, keyPassword } = this.state;
    if (keyEmail && keyPassword) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  saveLocalStorage() {
    const { email } = this.state;
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  }

  render() {
    const { disabled } = this.state;
    return (
      <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
        <input
          data-testid="email-input"
          onChange={ this.handleInputEmail }
          className="input-login"
        />
        <input
          data-testid="password-input"
          type="password"
          onChange={ this.handleKeyPassword }
          className="input-login"
        />
        <Link to="/comidas">
          <button
            className="btnLogin"
            type="button"
            data-testid="login-submit-btn"
            disabled={ disabled }
            onClick={ this.saveLocalStorage }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
