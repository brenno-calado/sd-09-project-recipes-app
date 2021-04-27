import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const addUser = () => {
    localStorage.setItem('user', JSON.stringify(user.email));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };
  console.log(user);

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const six = 6;
  return (
    <form>
      <input
        type="email"
        name="email"
        placeholder="Email"
        data-testid="email-input"
        onChange={ handleInput }
      />
      <input
        type="password"
        name="password"
        placeholder="senha"
        onChange={ handleInput }
        data-testid="password-input"
      />
      <Link to="/comidas">
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={
            !(user.email.match(/[\w.-]+@[\w-]+\.[\w-.]+/gi)
            && user.password.length > six)
          }
          onClick={ addUser }
        >
          Entrar
        </button>
      </Link>
    </form>
  );
};

export default Login;
