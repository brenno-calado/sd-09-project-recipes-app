import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
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
    <Form style={ { width: 300 } }>
      <h1 style={ { marginLeft: 90 } }>Login</h1>
      <Form.Group controlId="formBasicEmail">
        <Form.Label
          htmlFor="emailInput"
        >
          Endereço de Email
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Digite seu email"
          id="emailInput"
          data-testid="email-input"
          name="emailInput"
          onChange={ handleInputChange }
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label
          htmlFor="passwordInput"
        >
          Senha
        </Form.Label>
        <Form.Control
          placeholder="Digite sua senha"
          type="password"
          data-testid="password-input"
          id="passwordInput"
          name="passwordInput"
          onChange={ handleInputChange }
        />
      </Form.Group>
      <Button
        variant="primary"
        style={ { width: 230, marginLeft: 30 } }
        type="button"
        data-testid="login-submit-btn"
        id="login-submit-btn"
        name="login-submit-btn"
        disabled={ isDataValid }
        onClick={ () => { handleLocalStorage(); userEmailLocalStorage(); } }
      >
        Entrar
      </Button>
    </Form>
  );
}

export default Login;
