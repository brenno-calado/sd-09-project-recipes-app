import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import { loginUser } from '../actions';
import { setItemLocalStorage } from '../services/servicesLocalStorage';
import key from '../images/keyIcon.svg';

export default function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [buttonStatus, setButtonStatus] = useState(true);
  const [redirectLogin, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const validateLoginData = ({ email, password }) => {
    const validateEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const passwordLenght = password.length;
    const minPassword = 6;

    if (validateEmail.test(email) && passwordLenght > minPassword) {
      setButtonStatus(false);
    } else {
      setButtonStatus(true);
    }
  };

  useEffect(() => {
    validateLoginData(loginData);
  }, [loginData, buttonStatus]);

  const handleChange = ({ target: { name, value } }) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const loginRedirectUser = () => {
    const { email } = loginData;
    dispatch(loginUser(email));

    setRedirect(true);

    setItemLocalStorage('mealsToken', 1);
    setItemLocalStorage('cocktailsToken', 1);
    setItemLocalStorage('user', { email });
  };

  if (redirectLogin) return <Redirect to="/comidas" />;

  return (
    <Container fluid className="login-wrapper">
      <h1>Login</h1>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          data-testid="email-input"
          placeholder="User email"
          aria-label="Username"
          name="email"
          aria-describedby="basic-addon1"
          value={ loginData.name }
          onChange={ handleChange }
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <object
              className="key"
              type="image/svg+xml"
              data={ key }
            >
              KeyIcon
            </object>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="password"
          data-testid="password-input"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          name="password"
          value={ loginData.password }
          onChange={ handleChange }
        />
      </InputGroup>
      <Button
        block
        variant="primary"
        disabled={ buttonStatus }
        type="button"
        onClick={ loginRedirectUser }
        data-testid="login-submit-btn"
      >
        Login
      </Button>
    </Container>
  );
}
