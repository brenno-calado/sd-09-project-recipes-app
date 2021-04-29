import React, { Component } from 'react';

class index extends Component {
  render() {
    return (
      <div>
        Login
        <input
          type="email"
          placeholder="Email"
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default index;
