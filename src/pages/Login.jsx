import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


function Login() {
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
              placeholder="Insira seu email"
              data-testid="email-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              name="password"
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
