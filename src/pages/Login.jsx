import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import setLocalStorage from '../services/localStorage';
import '../Style/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validation = () => {
    const emailRegex = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\[a-z]{2,8})?$/;
    const minimum = 6;
    if (password.length > minimum && emailRegex.test(email)) {
      return false;
    }
    return true;
  };

  const setStorage = () => {
    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    setLocalStorage('user', JSON.stringify({ email }));
  };

  return (
    <div className="Login-body">
      <h1 className="title-login"> Minhas Receitas </h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label htmlFor="email">
            <Form.Control
              type="email"
              placeholder="Email"
              data-testid="email-input"
              value={ email }
              onChange={ (event) => setEmail(event.target.value) }
            />
          </Form.Label>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label htmlFor="password">
            <Form.Control
              type="password"
              placeholder="Senha"
              data-testid="password-input"
              value={ password }
              onChange={ (event) => setPassword(event.target.value) }
            />
          </Form.Label>
        </Form.Group>
      </Form>
      <Link to="/comidas" id="btn-login">
        <Button
          variant="light"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ validation() }
          onClick={ setStorage }
        >
          Entrar
        </Button>
      </Link>
    </div>
  );
}

export default Login;
