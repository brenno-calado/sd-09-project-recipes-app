import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeInProgress from './RecipeInProgress';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateEmail() {
    const emailValidator = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    return emailValidator.test(email);
  }

  function validatePassword() {
    const passwordValidator = /[\S]{7,}/;
    return passwordValidator.test(password);
  }

  function validateLogin() {
    let validation = true;
    if (!validateEmail()) validation = false;
    if (!validatePassword()) validation = false;
    return validation;
  }

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
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
  }

  function renderLoginButton() {
    return (
      <Link to="/comidas" htmlFor="button">
        <button
          data-testid="login-submit-btn"
          type="button"
          id="button"
          disabled={ !validateLogin() }
          onClick={ handleLoginButton }
        >
          Entrar
        </button>
      </Link>

    );
  }

  return (
    <div>
      <h1>Login</h1>
      { renderEmailInput() }
      { renderPasswordInput() }
      { renderLoginButton() }
      <RecipeInProgress />
    </div>
  );
}

export default Login;
