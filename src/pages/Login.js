import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [validationEmail, setValidationEmail] = useState(false);
  const [validationPassword, setValidationPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const activateButton = () => {
    if (validationEmail && validationPassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const validateEmail = ({ target }) => {
    const check = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(target.value);
    setEmail(target.value);
    setValidationEmail(check);
    activateButton();
  };

  const validatePassword = ({ target }) => {
    const min = 6;
    if (target.value.length >= min) {
      setValidationPassword(true);
    } else {
      setValidationPassword(false);
    }
    activateButton();
  };

  const saveTokens = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <div>
      Login
      <input type="email" data-testid="email-input" onChange={ validateEmail } />
      <input type="password" data-testid="password-input" onChange={ validatePassword } />
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ saveTokens }
        >
          Entrar
        </button>
      </Link>
    </div>

  );
};

export default Login;
