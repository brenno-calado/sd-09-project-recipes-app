import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../context';
import { fecthByName } from '../services/api';
import { startLocalStorage } from '../services/localStorageService';
import logo from '../images/logo-recipes.png';
import '../scss/Login.scss';
import '../scss/custom.scss';

function Login() {
  const { updateData } = useContext(Context);
  const [state, setState] = useState({ email: '', password: '' });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const checkFormats = () => {
    const { email, password } = state;
    const emailFormat = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
    const passwordFormat = /[\w\D]{7}/g.test(password);
    return emailFormat && passwordFormat;
  };

  const handleChange = ({ target: { type, value } }) => {
    setState({ ...state, [type]: value });
  };

  const handleSubmit = () => {
    const { email } = state;
    startLocalStorage(email);
    // localStorage.user = JSON.stringify({ email });
    // localStorage.mealsToken = 1;
    // localStorage.cocktailsToken = 1;
    updateData(fecthByName('', true));
    setShouldRedirect(true);
  };

  const createInput = (type) => (
    <label htmlFor={ type } className="form-label text-capitalize">
      {type}
      <input
        data-testid={ `${type}-input` }
        type={ type }
        id={ type }
        placeholder={ type === 'email' ? 'email@email.com' : 'password' }
        onChange={ handleChange }
        required
        className="form-control p-4 mb-3"
      />
    </label>
  );

  if (shouldRedirect) return <Redirect to="/comidas" />;

  return (
    <div className="wrapper pt-5">
      <section
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <img src={ logo } alt="12App - recipes" className="img mb-3" />
        <div className="d-flex flex-column justify-content-center">
          { createInput('email') }
          { createInput('password') }
        </div>
        <button
          data-testid="login-submit-btn"
          type="submit"
          onClick={ handleSubmit }
          disabled={ !checkFormats() }
          className="btn btn-personalised p-2"
        >
          Entrar
        </button>
      </section>
    </div>
  );
}

export default Login;
