import React, { useState } from 'react';

import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';

import key from '../images/keyIcon.svg';

export default function LoginPage() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

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
      <Button variant="primary">Login</Button>
    </Container>
  );
}
