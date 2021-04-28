import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Login() {
  const [button, setButton] = useState(true);

  const validateInputs = (email, password) => {
    const regex = /[a-zA-Z0-9\-_.]+@[a-zA-Z0-9]+.[a-z]+$/gm.test(email);
    const passwordLimit = 6;
    if (regex && password.length >= passwordLimit) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [redirect, setRedirect] = useState(false);

  const submitForm = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    setRedirect(true);
  };

  const handleChange = ({ target: { value, name } }) => {
    validateInputs(email, password);
    switch (name) {
    case 'email':
      return setEmail(value);
    case 'password':
      return setPassword(value);
    default:
      return undefined;
    }
  };

  if (redirect) {
    return <Redirect to="/comidas" />;
  }

  return (
    <form>
      <input
        type="text"
        placeholder="email"
        name="email"
        value={ email }
        onChange={ handleChange }
        autoComplete="off"
        data-testid="email-input"
      />
      <input
        type="password"
        placeholder="senha"
        value={ password }
        name="password"
        onChange={ handleChange }
        data-testid="password-input"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ submitForm }
        disabled={ button }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
