import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

const Login = () => {
  const [userEmail, changeUserEmail] = useState('');
  const [password, changePassword] = useState('');
  const [validForm, setFormStatus] = useState(false);
  const [logged, changeLoggedStatus] = useState(false);

  const handleEmail = ({ target: { value } }) => {
    changeUserEmail(value);
  };

  const minPasswordLength = 6;

  useEffect(() => {
    if (password.length > minPasswordLength
        && userEmail.includes('@')
        && userEmail.includes('.com')) {
      setFormStatus(true);
    } else {
      setFormStatus(false);
    }
  }, [password, userEmail]);

  const submitLogin = () => {
    if (validForm) {
      localStorage.setItem('mealsToken', 1);
      localStorage.setItem('cocktailsToken', 1);
      localStorage.setItem('user', JSON.stringify({ email: userEmail }));
      changeLoggedStatus(true);
    }
  };

  return (
    <div>
      { logged && <Redirect to="/receitas" /> }
      <form>
        <label htmlFor="email-input">
          Email
          <input
            type="text"
            name="email-input"
            data-testid="email-input"
            placeholder="Digite seu email"
            onChange={ handleEmail }
          />
          { !(userEmail.includes('@') && userEmail.includes('.com')) && userEmail
            && (
              <p style={ { color: 'red' } }>
                Email Inválido
              </p>
            )}
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            name="password-input"
            data-testid="password-input"
            placeholder="Digite sua senha"
            onChange={ ({ target: { value } }) => changePassword(value) }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validForm }
          onClick={ submitLogin }
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
