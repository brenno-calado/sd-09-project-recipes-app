import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../context';
import './styles/ButtonGreen.css';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [disable, setDisable] = useState(true);
  const { actions } = useContext(LoginContext);
  const history = useHistory();

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const validate = () => {
    const emailValidated = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email);
    const passwordValidated = /[0-9a-zA-Z$*&@#]{7}/.test(form.password);
    if (emailValidated && passwordValidated) {
      return (setDisable(false));
    } return (setDisable(true));
  };

  useEffect(() => {
    validate();
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.submitLogin(form.email);
    history.push('/comidas');
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
        <button
          className="button-green"
          type="button"
          onClick={ handleSubmit }
          disabled={ disable }
          data-testid="login-submit-btn"
        >

          Entrar

        </button>
      </form>
    </div>
  );
}

export default Login;
