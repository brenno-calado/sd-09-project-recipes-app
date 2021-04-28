import React, { Component } from 'react';
import { Redirect } from 'react-router';

import '../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailValidated: false,
      passWordValidated: false,
      redirect: false,
    };

    this.handlerEmail = this.handlerEmail.bind(this);
    this.handlerPassWord = this.handlerPassWord.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  handlerEmail({ target: { value } }) {
    const regex = (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const isvalid = regex.test(value);

    this.setState({
      emailValidated: isvalid,
      email: value,
    });
  }

  handlerPassWord({ target: { value } }) {
    const password = value.split('').length;
    const minCaracter = 6;
    let isValid = false;

    if (password > minCaracter) {
      isValid = true;
    }

    this.setState({
      passWordValidated: isValid,
    });
  }

  buttonClick(email) {
    const defaultTokenValue = 1;
    const emailUser = { email };
    const { emailValidated, passWordValidated } = this.state;

    if (emailValidated && passWordValidated) {
      console.log(emailValidated);
      localStorage.setItem('mealsToken', defaultTokenValue);
      localStorage.setItem('cocktailsToken', defaultTokenValue);
      localStorage.setItem('user', JSON.stringify(emailUser));

      this.setState({
        redirect: true,
      });
    }
  }

  render() {
    const { email, emailValidated, passWordValidated, redirect } = this.state;
    const buttonIsDisabled = !(emailValidated && passWordValidated);

    if (redirect) {
      return <Redirect to="/comidas" />;
    }

    return (
      <div className="content">
        <h1>
          Login
        </h1>
        <div className="inputs">
          <input
            data-testid="email-input"
            onChange={ this.handlerEmail }
            name="email"
            placeholder="Email"
            type="text"
          />
          <input
            data-testid="password-input"
            onChange={ this.handlerPassWord }
            name="password"
            placeholder="Senha"
            type="text"
          />
        </div>
        <button
          className="bnt_login"
          data-testid="login-submit-btn"
          disabled={ buttonIsDisabled }
          onClick={ () => {
            this.buttonClick(email);
          } }
          type="submit"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
