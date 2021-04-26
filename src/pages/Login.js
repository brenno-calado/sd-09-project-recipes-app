import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const handleClick = () => {
    const user = {
      email: email,
    }
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(user));
   }

    const validateFields = () => {
    const PASS_LENGTH = 6;
    const regexCheck = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

    return regexCheck.test(email) && password.length > PASS_LENGTH;
  }

  return (
    <>
      <label htmlFor="email-user">
        Email: 
        <input
          id="email-user"
          type="text"
          data-testid="email-input"
          onChange={ ({ target: { value: valueEmail }}) =>  (
            setEmail(valueEmail) )}
        />
      </label>
      <label htmlFor="password-user">
        Password:
        <input
          id="password-user"
          type="password"
          data-testid="password-input"
          onChange={ ({ target: { value: valuePassword }}) =>  (
            setPassword(valuePassword) )}
        />
      </label>
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ !validateFields() }
        >
          Login
        </button>
      </Link>
    </>
  );
}