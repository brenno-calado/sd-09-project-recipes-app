import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loginValido, setLoginValido] = useState(false);

  function validaLogin({ target: { value, type } }) {
    const re = /\S+@\S+\.\S+/;
    setLoginValido(false);
    const caracteres = 6;
    if (type === 'email') {
      setEmail(value);
    } else {
      setSenha(value);
    }
    if (re.test(email) && senha.length >= caracteres) {
      setLoginValido(true);
    }
  }

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  }
  return (
    <div>
      <h1> Login </h1>
      <label htmlFor="email">
        Email
        <input
          type="email"
          value={ email }
          id="email"
          onChange={ validaLogin }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="email">
        Senha
        <input
          type="password"
          value={ senha }
          id="senha"
          data-testid="password-input"
          onChange={ validaLogin }
        />
      </label>
      <Link to="/comidas">
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !loginValido }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}

export default Login;
