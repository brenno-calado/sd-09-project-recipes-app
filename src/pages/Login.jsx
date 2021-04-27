import React, { Component } from 'react';

import '../styles/login.css';

class Login extends Component {
  render() {
    return (
      <div className="content">
        <h1>
          Login
        </h1>
        <div className="inputs">
          <input
            data-testid="email-input"
            name="email"
            placeholder="Email"
            type="text"
          />
          <input
            data-testid="password-input"
            name="password"
            placeholder="Senha"
            type="text"
          />
        </div>
        <input
          className="bnt_login"
          data-testid="login-submit-btn"
          type="submit"
          value="Entrar"
        />
      </div>
    );
  }
}

export default Login;
