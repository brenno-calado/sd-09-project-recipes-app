import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import key from '../images/keyIcon.svg';

export default function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [buttonOff, setButtonOff] = useState(true);

  useEffect(() => {
    const { email, password } = loginData;
    const validateEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const passwordLenght = password.length;
    const minPassword = 6;

    if (validateEmail.test(email) && passwordLenght > minPassword) {
      setButtonOff(false);
    } else {
      setButtonOff(true);
    }
  }, [loginData]);

  const handleChange = ({ target: { name, value } }) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <Container fluid>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Username"
          aria-label="Username"
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
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          value={ loginData.password }
          onChange={ handleChange }
        />
      </InputGroup>
      <Link to="/mainPage">
        <Button
          variant="primary"
          disabled={ buttonOff }
          type="button"
          data-testid="login-submit-btn"
        >
          Login
        </Button>
      </Link>
    </Container>
  );
}
