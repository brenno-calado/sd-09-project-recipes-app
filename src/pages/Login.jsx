import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="meals login-container">
      <h1>Recipes App</h1>
      <input
        type="email"
        data-testid="email-input"
        style={ { width: 300, marginBottom: 5 } }
        className="form-control"
        placeholder="email"
      />
      <input
        type="password"
        data-testid="password-input"
        style={ { width: 300, marginBottom: 5 } }
        className="form-control"
        placeholder="senha"
      />
      <button
        type="button"
        disabled
        data-testid="login-submit-btn"
        style={ { width: 300 } }
        className="btn btn-primary"
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
