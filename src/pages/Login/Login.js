import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { savesUserData as savesUserAction } from '../../actions/userActions';

const Login = (props) => {
  const [user, setUser] = useState({
    email: undefined,
    password: undefined,
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const verifiesUserData = () => {
    const regexEmailValidation = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const isValidEmail = regexEmailValidation.test(user.email);
    const regexPasswordValidation = /[\S]{6,}/;
    const isValidPassword = regexPasswordValidation.test(user.password);
    setIsDisabled(!(isValidEmail && isValidPassword));
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUser({
      ...user,
      [name]: value,
    });

    verifiesUserData();
  };

  const handleClick = () => {
    const { savesUserData } = props;
    savesUserData(user);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
  };

  return (
    <>
      <input
        data-testid="email-input"
        id="userEmail"
        name="email"
        type="email"
        placeholder="E-mail"
        onChange={ handleChange }
      />
      <input
        data-testid="password-input"
        id="userPassword"
        name="password"
        type="password"
        placeholder="Senha"
        onChange={ handleChange }
      />
      <Link to="/comidas">
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ isDisabled }
          onClick={ () => handleClick() }
        >
          Entrar
        </button>
      </Link>
    </>
  );
};

Login.propTypes = {
  savesUserData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  savesUserData: (userData) => dispatch(savesUserAction(userData)),
});

export default connect(null, mapDispatchToProps)(Login);
