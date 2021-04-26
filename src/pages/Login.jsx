import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const seven = 7;
  const validEmailRegex = /^[\w.]+@[a-z]+.\w{2,3}$/g.test(email);

  useEffect(() => {
    if (validEmailRegex && password.length >= seven) {
      setVerify(false);
    } else {
      setVerify(true);
    }
  }, [email, password, validEmailRegex]);

  useEffect(() => {
    if (redirect) {
      localStorage.setItem('user', JSON.stringify({ email }));
    }
  }, [redirect, email]);

  return (
    <div className="meals login-container">
      <h1>Recipes App</h1>
      <input
        name="email"
        type="email"
        data-testid="email-input"
        style={ { width: 300, marginBottom: 5 } }
        className="form-control"
        placeholder="email"
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        name="password"
        type="password"
        data-testid="password-input"
        style={ { width: 300, marginBottom: 5 } }
        className="form-control"
        placeholder="senha"
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        type="button"
        disabled={ verify }
        data-testid="login-submit-btn"
        style={ { width: 300 } }
        className="btn btn-primary"
        onClick={ () => setRedirect(true) }
      >
        Entrar
      </button>
      {redirect && <Redirect to="/comidas" />}
    </div>
  );
}

export default Login;
