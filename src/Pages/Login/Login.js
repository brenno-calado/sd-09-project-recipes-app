import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [emailLogin, setEmailLogin] = useState();
  // const [passwordLogin, setPasswordLogin] = useState();
  const [disable, setDisable] = useState(true);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  function checkValidation() {
    if (validEmail && validPassword) {
      setDisable(false);
    }
  }

  function handleEmail({ target: { value } }) {
    setEmailLogin(value);
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = regex.test(value);
    setValidEmail(isValid);
  }

  function handlePassword({ target: { value } }) {
    // setPasswordLogin(value);
    const minLength = 7;
    if (value.length >= minLength) {
      setValidPassword(true);
    }
  }

  useEffect(() => {
    checkValidation();
  });

  function handleClick() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: emailLogin }));
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="email"
        data-testid="email-input"
        onChange={ handleEmail }
        placeholder="Email"
      />
      <input
        type="password"
        data-testid="password-input"
        onChange={ handlePassword }
        placeholder="Senha"
      />
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disable }
          onClick={ () => handleClick() }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}

export default Login;
