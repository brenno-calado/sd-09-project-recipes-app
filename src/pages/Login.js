import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const handleChange = ({ target: { value, name } }) => {
    switch (name) {
    case 'email':
      return setEmail(value);
    case 'password':
      return setPassword(value);
    default:
      return undefined;
    }
  };

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
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
