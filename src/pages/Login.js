import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const INITIAL_STATE = { email: '', password: '', shouldRedirect: false };

function Login() {
  const [state, setState] = useState(INITIAL_STATE);

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
    localStorage.user = JSON.stringify({ email });
    localStorage.mealsToken = 1;
    localStorage.cocktailsToken = 1;
    setState({ ...state, shouldRedirect: true });
  };

  const createInput = (type) => (
    <input
      data-testid={ `${type}-input` }
      type={ type }
      placeholder={ type }
      onChange={ handleChange }
      required
    />
  );

  if (state.shouldRedirect) return <Redirect to="/comidas" />;

  return (
    <section>
      { createInput('email') }
      { createInput('password') }

      <button
        data-testid="login-submit-btn"
        type="submit"
        onClick={ handleSubmit }
        disabled={ !checkFormats() }
      >
        Entrar
      </button>
    </section>
  );
}

export default Login;
