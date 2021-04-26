import React, { useEffect, useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonOff, setButtonOff] = useState(true);

  useEffect(() => {
    const validateEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const passwordLength = password.length;
    const minPasswordLength = 6;
    if (validateEmail.test(email) && passwordLength > minPasswordLength) {
      setButtonOff(false);
    } else {
      setButtonOff(true);
    }
  }, [password, email]);

  function handleChangeEmail({ target }) {
    setEmail(target.value);
  }

  function handleChangePassword({ target }) {
    setPassword(target.value);
  }

  function handleLogin() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  }

  return (
    <div>
      <input
        onChange={ handleChangeEmail }
        type="email"
        data-testid="email-input"
      />
      <input
        onChange={ handleChangePassword }
        type="password"
        min="6"
        data-testid="password-input"
      />
      <button
        disabled={ buttonOff }
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleLogin }
      >
        Entrar
      </button>
    </div>
  );
}
