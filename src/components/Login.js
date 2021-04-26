import React, { useState } from 'react';

function Login() {
  const [loginState, setLoginState] = useState({ email: '', password: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLoginState({ ...loginState, [name]: value });
  };

  const validateLogin = () => {
    const validateEmail = /\w+@\w+(.com)/g;
    const passwordMinLength = 6;
    const { email, password } = loginState;
    return !(validateEmail.test(email) && password.length > passwordMinLength);
  };

  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          type="text"
          name="email"
          id="email"
          data-testid="email-input"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="password">
        Senha:
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          onChange={ handleChange }
        />
      </label>

      <button
        type="submit"
        disabled={ validateLogin() }
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
