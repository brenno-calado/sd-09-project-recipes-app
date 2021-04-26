import React from 'react';

function Login() {
  return (
    <form>
      <input
        type="text"
        placeholder="email"
        name="email"
        data-testid="email-input"
      />
      <input
        type="password"
        placeholder="senha"
        name="senha"
        data-testid="password-input"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
