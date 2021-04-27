import React, { Component } from 'react';

import '../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailValidated: false,
      passWordValidated: false,
    };

    this.handlerEmail = this.handlerEmail.bind(this);
    this.handlerPassWord = this.handlerPassWord.bind(this);
  }

  handlerEmail({ target: { value } }) {
    const regex = (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const isvalid = regex.test(value);

    this.setState({
      emailValidated: isvalid,
    });
  }

  handlerPassWord({ target: { value } }) {
    const password = value.split('').length;
    const minCaracter = 6;
    let isValid = false;

    if (password >= minCaracter) {
      isValid = true;
    }

    this.setState({
      passWordValidated: isValid,
    });
  }

  render() {
    const { emailValidated, passWordValidated } = this.state;
    const buttonIsDisabled = !(emailValidated && passWordValidated);

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
        <input
          className="bnt_login"
          data-testid="login-submit-btn"
          disabled={ buttonIsDisabled }
          type="submit"
          value="Entrar"
        />
      </div>
    );
  }
}

export default Login;
