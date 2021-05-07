import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { saveTokens, saveUser } from '../services/storage';

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  useEffect(() => {
    const emailIsValid = /\S+@\S+\.\S+/.test(email);
    const passwordMin = 6;
    const passwordIsValid = password.length > passwordMin;
    const buttonIsDisabled = !(emailIsValid && passwordIsValid);
    setDisabled(buttonIsDisabled);
  }, [email, password]);

  const handleLogin = () => {
    saveTokens();
    saveUser(email);
    history.push('/comidas');
  };
  return (
    <div className="login">
      <label htmlFor="email-input">
        Email
        <input
          id="email-input"
          type="email"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="email-input">
        Senha
        <input
          id="password-input"
          type="password"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ () => handleLogin() }
      >
        Entrar

      </button>
    </div>
  );
};

export default Login;
