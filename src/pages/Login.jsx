import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import SearchBar from '../components/SearchBar';


function Login() {
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Email validation source: https://www.kindacode.com/article/live-email-validation-in-react-with-regex/
  const validateEmail = (e) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const userEmail = e.target.value;
    setEmail(userEmail);
    if (emailRegex.test(userEmail)) {
      return setEmailIsValid(true);
    } setEmailIsValid(false);
  };

  const validatePassword = (e) => {
    const password = e.target.value;
    const minPasswordLength = 6;
    setUserPassword(password);
    if (password.length > minPasswordLength) {
      return setPasswordIsValid(true);
    } setPasswordIsValid(false);
  };

  const populateStorage = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const storeEmail = { email };
    localStorage.setItem('user', JSON.stringify(storeEmail));
  };

  const handleClick = () => {
    populateStorage();
  };

  return (
    <main>
      <Container fluid>
        <h1>Login</h1>
        <Form>
          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={ email }
              onChange={ validateEmail }
              placeholder="Insira seu email"
              data-testid="email-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={ userPassword }
              onChange={ validatePassword }
              placeholder="Insira sua senha"
              data-testid="password-input"
            />
          </Form.Group>
          <Link to="/comidas">
            <Button
              type="submit"
              data-testid="login-submit-btn"
              disabled={ emailIsValid && passwordIsValid ? '' : true }
              onClick={ handleClick }
            >
              Entrar
            </Button>
          </Link>
        </Form>
      </Container>
    </main>
  );
}

export default Login;
