import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useRecipeContext } from '../contexts/recipeContext';

function Login() {
  const { handleLocalStorage } = useRecipeContext();

  const [userData, setUserData] = useState({
    emailInput: '',
    passwordInput: '',
  });
  const [isDataValid, setIsDataValid] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  function handleInputChange({ target }) {
    const { name, value } = target;
    setUserData({ ...userData, [name]: value });
  }

  function userEmailLocalStorage() {
    const { emailInput } = userData;
    const email = { email: emailInput };
    localStorage.setItem('user', JSON.stringify(email));
    setShouldRedirect(true);
  }

  useEffect(() => {
    const { emailInput, passwordInput } = userData;
    const emailValidated = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(emailInput);
    const passwordRegex = new RegExp(/[\w\D]{7}/g);

    if (emailValidated && passwordRegex.test(passwordInput)) {
      setIsDataValid(false);
    } else {
      setIsDataValid(true);
    }
  }, [userData]);

  if (shouldRedirect) return <Redirect to="/comidas" />;

  return (
    <form>
      <label
        htmlFor="emailInput"
      >
        <input
          type="text"
          id="emailInput"
          data-testid="email-input"
          name="emailInput"
          onChange={ handleInputChange }
        />
      </label>
      <label
        htmlFor="passwordInput"
      >
        <input
          type="password"
          data-testid="password-input"
          id="passwordInput"
          name="passwordInput"
          onChange={ handleInputChange }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        id="login-submit-btn"
        name="login-submit-btn"
        disabled={ isDataValid }
        onClick={ () => { handleLocalStorage(); userEmailLocalStorage(); } }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
