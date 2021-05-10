import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import recipeLoginPage from '../images/recipeLoginPage.jpg';
import '../css/loginPage.css';

export default function Login() {
  const INITIAL_STATE = {
    email: '',
    password: '',
  };

  const [loginForm, setLoginForm] = useState(INITIAL_STATE);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const emailValidator = (userEmail) => {
    const RegExp = /^[\S.]+@[a-z]+\.\w{2,3}$/g;
    const validator = userEmail
      .match(RegExp);
    if (validator !== null) {
      return true;
    }
  };

  const passwordValidator = (userPassword) => {
    const minimumPasswordLength = 6;
    if (userPassword.length > minimumPasswordLength) {
      return true;
    }
  };

  const submitValidator = () => {
    if (emailValidator(loginForm.email) && passwordValidator(loginForm.password)) {
      return true;
    }
  };

  const saveTokens = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: loginForm.email }));
  };

  const handleLoginButtonClick = () => {
    if (submitValidator()) {
      saveTokens();
    }
  };

  return (
    <main>
      <form className="container login-form">
        <img className="login-image" src={ recipeLoginPage } alt="menu" />
        <label className="labels" htmlFor="email">
          E-mail
          <input
            className="inputs"
            data-testid="email-input"
            id="email"
            name="email"
            value={ loginForm.email }
            onChange={ handleChange }
          />
        </label>
        <label className="labels" htmlFor="password">
          Senha
          <input
            className="inputs"
            data-testid="password-input"
            type="password"
            id="password"
            name="password"
            value={ loginForm.password }
            onChange={ handleChange }
          />
        </label>
        <Link to="/comidas">
          <button
            className="login-btn"
            type="button"
            data-testid="login-submit-btn"
            disabled={ !submitValidator() }
            onClick={ handleLoginButtonClick }
          >
            Entrar
          </button>
        </Link>
      </form>
    </main>
  );
}
