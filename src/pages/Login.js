import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import rockGlass from '../images/rockGlass.svg';
import '../css/Login.css';
import 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    const user = {
      email,
    };

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const validateFields = () => {
    const PASS_LENGTH = 6;
    const regexCheck = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

    return regexCheck.test(email) && password.length > PASS_LENGTH;
  };

  return (
    <div className="login-body">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <input
        id="email-user"
        type="text"
        data-testid="email-input"
        placeholder="email"
        className="input-field"
        onChange={ ({ target: { value: valueEmail } }) => (
          setEmail(valueEmail)) }
      />
      <input
        id="password-user"
        type="password"
        data-testid="password-input"
        placeholder="password"
        className="input-field"
        onChange={ ({ target: { value: valuePassword } }) => (
          setPassword(valuePassword)) }
      />
      <Link
        to="/comidas"
        id="login-button"
      >
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          className="login-button"
          disabled={ !validateFields() }
        >
          Login
        </button>
      </Link>
    </div>
  );
}
