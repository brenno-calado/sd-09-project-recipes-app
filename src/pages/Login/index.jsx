import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as S from './styled';
import validationLogin from '../../validations/loginValidation';
import { context } from '../../context';
import logo from '../../images/logo.svg';

function Login() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { authLogin, setAuthLogin,
    formValidation, setFormValidation } = useContext(context);

  const handleChange = ({ target: { name, value } }) => {
    setAuthLogin({ ...authLogin, [name]: value });
  };

  const handleSubmit = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: authLogin.email }));
    setShouldRedirect(true);
  };

  const validation = async () => {
    const validate = await validationLogin.isValid(authLogin);
    setFormValidation(validate);
  };

  useEffect(() => {
    validation();
  });

  if (shouldRedirect) return <Redirect to="/comidas" />;

  return (
    <S.Container>
      <S.Form>
        <img src={ logo } alt="logo" />
        <input
          type="email"
          name="email"
          placeholder="Digite seu email"
          data-testid="email-input"
          onChange={ handleChange }
        />
        <input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          data-testid="password-input"
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !formValidation }
          onClick={ handleSubmit }
        >
          entrar
        </button>
      </S.Form>
    </S.Container>
  );
}

export default Login;
