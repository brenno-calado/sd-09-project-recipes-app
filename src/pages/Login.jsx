import React, { useState, useEffect } from 'react';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [disable, setDisable ] = useState(true);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const validate = () => {
    const emailValidated = /^[\S.]+@[a-z]+.\w{2,3}$/g.test(form.email);
    const passwordValidated = /[0-9a-zA-Z$*&@#]{6}/.test(form.password);
    if (emailValidated && passwordValidated) {
      return (setDisable(false));
    } return (setDisable(true));
  };

  useEffect(() => {
    validate();
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate());
  };

  return (
    <div>
      <form className="login-form">
        <h1> Login </h1>
        <label htmlFor="email-input">
          <input
            type="email"
            id="email-input"
            name="email"
            value={ form.email }
            onChange={ handleChange }
            placeholder="Email"
            data-testid="email-input"
          />
        </label>
        <br />
        <label htmlFor="password-input">
          <input
            type="password"
            id="password-input"
            name="password"
            value={ form.password }
            onChange={ handleChange }
            placeholder="Senha"
            data-testid="password-input"
          />
        </label>
        <br />
        <button type="button" onClick={ handleSubmit } disabled={ disable } data-testid="login-submit-btn">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
