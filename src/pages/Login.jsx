import React, { useState } from 'react';
import { useHistory } from 'react-router';
import logo from '../images/logo.svg';
import '../styles/pages/Login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPass, setvalidPass] = useState(false);

  function handleEmailChange({ target }) {
    const emailValidator = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(target.value);
    setEmail(target.value);
    setValidEmail(emailValidator);
  }

  function handlePassChange({ target }) {
    const passValidator = target.value.length >= Number('7');
    setvalidPass(passValidator);
  }

  function handleSubmit() {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    history.push('/comidas');
  }

  return (
    <div className="login">
      <img src={ logo } alt="logo" />
      <form className="login-form-container">
        <input
          type="email"
          data-testid="email-input"
          onChange={ handleEmailChange }
          placeholder="E-mail"
        />
        <input
          type="password"
          data-testid="password-input"
          onChange={ handlePassChange }
          placeholder="Senha"
        />
        <button
          type="button"
          disabled={ !(validEmail && validPass) }
          data-testid="login-submit-btn"
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
