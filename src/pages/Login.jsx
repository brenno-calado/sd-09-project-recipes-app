import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState(true);
  const [buttonStatus, setButtonStatus] = useState('login-btn-disabled');
  const [redirect, setRedirect] = useState(false);
  const seven = 7;
  const validEmailRegex = /\S+@\S+\.\S+/.test(email);
  const cocktails = [];
  const meals = [];
  const inProgress = { cocktails, meals };
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));

  useEffect(() => {
    if (validEmailRegex && password.length >= seven) {
      setVerify(false);
      setButtonStatus('login-btn');
    } else {
      setVerify(true);
      setButtonStatus('login-btn-disabled');
    }
  }, [email, password, validEmailRegex]);

  useEffect(() => {
    if (redirect) {
      localStorage.setItem('user', JSON.stringify({ email }));
      localStorage.setItem('mealsToken', JSON.stringify(1));
      localStorage.setItem('cocktailsToken', JSON.stringify(1));
    }
  }, [redirect, email]);

  return (
    <div className="meals login-container">
      <h1 className="login-title">Recipes App</h1>
      <label htmlFor="email-input" className="input-label">
        Email
        <input
          name="email"
          type="email"
          id="email-input"
          data-testid="email-input"
          style={ { width: 300, marginBottom: 5 } }
          className="login-input"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password-input" className="input-label">
        Senha
        <input
          name="password"
          type="password"
          id="password-input"
          data-testid="password-input"
          style={ { width: 300, marginBottom: 5 } }
          className="login-input"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        type="button"
        disabled={ verify }
        data-testid="login-submit-btn"
        style={ { width: 300 } }
        className={ buttonStatus }
        onClick={ () => setRedirect(true) }
      >
        Entrar
      </button>
      {redirect && <Redirect to="/comidas" />}
    </div>
  );
}

export default Login;
