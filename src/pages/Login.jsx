import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import setLocalStorage from '../services/localStorage';
import '../Style/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validation = () => {
    const emailRegex = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\[a-z]{2,8})?$/;
    const minimum = 6;
    if (password.length > minimum && emailRegex.test(email)) {
      return false;
    }
    return true;
  };

  const setStorage = () => {
    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    setLocalStorage('user', JSON.stringify({ email }));
  };

  return (
    <div className="Login-body">
      <label htmlFor="email">
        Digite o email:
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
        />
      </label>
      <label htmlFor="password">
        Digite a senha:
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ (event) => setPassword(event.target.value) }
        />
      </label>
      <Link to="/comidas">
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ validation() }
          onClick={ setStorage }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}

export default Login;
