import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginValid, setIsLoginValid] = useState(false);

  function handleEmailInput({ target: { value } }) {
    setEmail(value);
  }

  function renderEmailInput() {
    return (
      <input
        placeholder="Email"
        data-testid="email-input"
        id="email-input"
        type="text"
        value={ email }
        onChange={ handleEmailInput }
      />
    );
  }

  function handlePasswordInput({ target: { value } }) {
    setPassword(value);
  }

  function renderPasswordInput() {
    return (
      <input
        placeholder="Password"
        data-testid="password-input"
        id="password-input"
        type="password"
        value={ password }
        onChange={ handlePasswordInput }
      />
    );
  }

  function handleLoginButton() {
    setIsLoginValid(false);
  }

  function renderLoginButton() {
    return (
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !isLoginValid }
        onClick={ handleLoginButton }
      >
        Entrar
      </button>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      { renderEmailInput() }
      { renderPasswordInput() }
      { renderLoginButton() }
    </div>
  );
}

export default Login;
