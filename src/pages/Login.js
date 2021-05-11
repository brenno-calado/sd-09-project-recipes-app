import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../css/Login.css";

const verifyInputs = (user, setDisable) => {
  const { email, password } = user;
  const emailRegex = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
  const passwordLength = 6;
  const isValid = email.match(emailRegex) && password.length > passwordLength;
  if (isValid) setDisable(false);
  if (!isValid) setDisable(true);
};

const Login = () => {
  const object = {
    email: '',
    password: '',
  };

  const [user, setUser] = useState(object);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    verifyInputs(user, setDisable);
  }, [user]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
  };

  const { email, password } = user;

  return (
    <section>
      <div className="container-css">
        <div className="left-content">
          <h1 className="title color-white">
            Recipes App
          </h1>
          <img
            src="https://www.flaticon.com/svg/vstatic/svg/2509/2509468.svg?token=exp=1620687326~hmac=0b3688ac60f14b0da36204ee22c449f1"
            alt="Ícone de comida"
          />
        </div>
        <div className="form right-content">
          <Form.Label htmlFor="email" className="color-white inputs-form">
            Email
            <Form.Control
              data-testid="email-input"
              name="email"
              id="email"
              type="text"
              onChange={ handleChange }
              value={ email }
            />
          </Form.Label>
          <Form.Label htmlFor="password" className="color-white inputs-form">
            Senha
            <Form.Control
              data-testid="password-input"
              name="password"
              id="password"
              type="password"
              onChange={ handleChange }
              value={ password }
            />
          </Form.Label>
          <Link to="/comidas">
            <Button
              variant="success"
              type="button"
              disabled={ disable }
              onClick={ handleClick }
              data-testid="login-submit-btn"
            >
              Entrar
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
