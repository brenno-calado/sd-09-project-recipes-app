import React from 'react';

function Login() {
  return (
    <div className="login-container">
      <h1>Login 2.0</h1>
      <input
        type="email"
        className="form-control"
        placeholder="email"
      />
      <input
        type="password"
        className="form-control"
        placeholder="senha"
      />
      <button
        type="button"
        style={ { width: 300 } }
        className="btn btn-primary"
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
