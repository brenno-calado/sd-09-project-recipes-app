import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../CSS/Login.css';
import cooking from '../images/cooking.png';

function Login() {
  const [button, setButton] = useState(true);

  /* Regex found at: https://github.com/tryber/sd-09-live-lectures/tree/lecture/12.2 */
  const validateInputs = (email, password) => {
    const regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/igm.test(email);
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
    <div>
      <section className="login-section">
        <img className="icon" src={ cooking } alt="icon" />
        <div className="login-text">
          <h1>Recipe App</h1>
          <p>Bem-vindo, Mestre Cuca</p>
        </div>
        <div className="login-card">
          <form className="login--form">
            <input
              className="login--input"
              type="text"
              placeholder="email"
              name="email"
              value={ email }
              onChange={ handleChange }
              autoComplete="off"
              data-testid="email-input"
            />
            <input
              className="login--input"
              type="password"
              placeholder="senha"
              value={ password }
              name="password"
              onChange={ handleChange }
              data-testid="password-input"
            />
            <button
              className="login--button"
              type="button"
              data-testid="login-submit-btn"
              onClick={ submitForm }
              disabled={ button }
            >
              Entrar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
