import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import setStorage from '../helpers/index';

function Login() {
  const [loginState, setLoginState] = useState({ email: '', password: '' });
  const history = useHistory();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = loginState;
    setStorage('mealsToken', 1);
    setStorage('cocktailsToken', 1);
    setStorage('user', { email });
    history.push('/comidas');
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
        onClick={ handleSubmit }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
