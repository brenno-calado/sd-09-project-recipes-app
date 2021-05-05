import React, { useState } from 'react';
import { Redirect } from 'react-router';
import './Styles/Login.css';

function Login() {
  const [state, setState] = useState({
    login: '',
    isLoginValid: false,
    password: '',
    isPasswordValid: false,
  });

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const verifyLogin = () => {
    const validLogin = new RegExp(
      /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    );
    if (validLogin.test(state.login)) {
      setState({
        ...state,
        isLoginValid: true,
      });
    }
  };

  const verifyPassword = () => {
    const minLength = 6;
    if (state.password.length > minLength) {
      setState({
        ...state,
        isPasswordValid: true,
      });
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleClick = () => {
    const magicNumber = 1;
    const userData = {
      email: state.login,
    };
    localStorage.setItem('mealsToken', magicNumber);
    localStorage.setItem('cocktailsToken', magicNumber);
    localStorage.setItem('user', JSON.stringify(userData));
    setShouldRedirect(true);
  };

  return (
    <div className="Login">
      <form className="form">
        <h1>Login</h1>
        <input
          className="input"
          type="email"
          data-testid="email-input"
          placeholder="Email"
          name="login"
          onChange={ handleChange }
          onKeyUp={ verifyLogin }
          value={ state.login }
        />
        <input
          className="input"
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          name="password"
          onChange={ handleChange }
          onKeyUp={ verifyPassword }
          value={ state.password }
        />
        <button
          className="button"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !state.isLoginValid || !state.isPasswordValid }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
      {shouldRedirect ? <Redirect to="/comidas" /> : null}
    </div>
  );
}

export default Login;
