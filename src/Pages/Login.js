import React, { useState } from 'react';

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
    const validator = userEmail.match(/^([\w.-]+)@([\w-]+)((.(\w){2,3})+)$/);
    if (validator !== null) {
      return true;
    }
  };

  const passwordValidator = (userPassword) => {
    const minimumPasswordLength = 6;
    if (userPassword.length >= minimumPasswordLength) {
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
    localStorage.setItem('user', JSON.stringify(loginForm.email));
  };

  const handleLoginButtonClick = () => {
    if (submitValidator()) {
      saveTokens();
    }
  };

  return (
    <div>
      Login
      <form>
        <label htmlFor="email">
          E-mail:
          <input
            data-testid="email-input"
            id="email"
            name="email"
            value={ loginForm.email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            id="password"
            name="password"
            value={ loginForm.password }
            onChange={ handleChange }
          />
        </label>
      </form>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !submitValidator() }
        onClick={ handleLoginButtonClick }
      >
        Entrar
      </button>
    </div>
  );
}
