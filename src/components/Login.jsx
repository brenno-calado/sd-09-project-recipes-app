import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="email">
        <input
          type="email"
          data-testid="email-input"
          name="email"
        />
        Digite o email:
      </label>
      <label htmlFor="password">
        <input
          type="password"
          data-testid="password-input"
          name="password"
        />
        Digite a senha:
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
