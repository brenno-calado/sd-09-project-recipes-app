import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonOff, setButtonOff] = useState(true);

  useEffect(() => {
    const validateEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const passwordLenght = password.length;
    const minPassword = 6;

    if (validateEmail.test(email) && passwordLenght > minPassword) {
      setButtonOff(false);
    } else {
      setButtonOff(true);
    }
  }, [password, email]);

  function handleChageEmail({ target }) {
    setEmail(target.value);
  }

  function handleChagePassword({ target }) {
    setPassword(target.value);
  }

  function handleLogin() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
  }

  return (
    <form>
      <label htmlFor="inputEmail">
        Email:
        <input
          id="inputEmail"
          onChange={ handleChageEmail }
          type="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="inputPassword">
        Password:
        <input
          id="inputPassword"
          onChange={ handleChagePassword }
          type="password"
          min="6"
          data-testid="password-input"
        />
      </label>
      <Link to="/mainPage">
        <button
          disabled={ buttonOff }
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleLogin }
        >
          Entrar
        </button>
      </Link>

    </form>
  );
}
