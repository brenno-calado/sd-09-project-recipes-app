import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const INITIAL_LOGIN = {
    email: '',
    password: '',
  };
  const [isDisabled, setIsDisabled] = useState(true);
  const [login, setLogin] = useState(INITIAL_LOGIN);

  useEffect(() => {
    // regex de email retirado de: https://ui.dev/validate-email-address-javascript/
    const inputsVerifier = () => {
      const { email, password } = login;
      const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      const passwordRegex = new RegExp(/[\w\D]{7}/g);
      if (emailRegex.test(email) && passwordRegex.test(password)) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    inputsVerifier();
  }, [login]);

  const handleClick = () => {
    const token = 1;
    const user = {
      email: login.email,
    };
    localStorage.setItem('mealsToken', token);
    localStorage.setItem('cocktailsToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const renderLoginInputs = () => (
    <form>
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={ login.email }
        onChange={ handleChange }
        data-testid="email-input"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={ login.password }
        onChange={ handleChange }
        data-testid="password-input"
        placeholder="Senha"
      />
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </Link>
    </form>
  );

  return (
    <>
      {renderLoginInputs()}
    </>
  );
};

export default Login;
