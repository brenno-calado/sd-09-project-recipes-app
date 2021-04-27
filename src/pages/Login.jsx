import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

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
              value={ userEmail }
              onChange={ (e) => setUserEmail(e.target.value) }
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
              onChange={ (e) => setUserPassword(e.target.value) }
              placeholder="Insira sua senha"
              data-testid="password-input"
            />
          </Form.Group>
          <Button
            type="submit"
            data-testid="login-submit-btn"
          >
            Entrar
          </Button>
        </Form>
      </Container>
    </main>
  );
}

export default Login;
