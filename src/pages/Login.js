import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { savePath } from '../redux/actions/index';

const verifyInputs = (user, setDisable) => {
  const { email, password } = user;
  const emailRegex = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
  const passwordLength = 6;
  const isValid = email.match(emailRegex) && password.length > passwordLength;
  if (isValid) setDisable(false);
  if (!isValid) setDisable(true);
};

const Login = ({ pathnameDispatcher }) => {
  const object = {
    email: '',
    password: '',
  };

  const [user, setUser] = useState(object);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    verifyInputs(user, setDisable);
  }, [user]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    pathnameDispatcher('/comidas');
  };

  const { email, password } = user;

  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          data-testid="email-input"
          name="email"
          id="email"
          type="text"
          onChange={ handleChange }
          value={ email }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          data-testid="password-input"
          name="password"
          id="password"
          type="password"
          onChange={ handleChange }
          value={ password }
        />
      </label>
      <Link to="/comidas">
        <button
          type="button"
          disabled={ disable }
          onClick={ handleClick }
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  pathnameDispatcher: (pathname) => dispatch(savePath(pathname)),
});

Login.propTypes = {
  pathnameDispatcher: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
