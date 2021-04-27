import React, { useContext, useEffect } from 'react';
import * as S from './styled';
import foodBackground from '../../images/foodbackground.png';
import validationLogin from '../../validations/loginValidation';
import { context } from '../../context';

function Login() {
  const { authLogin, setAuthLogin,
    formValidation, setFormValidation } = useContext(context);

  const handleChange = ({ target: { name, value } }) => {
    setAuthLogin({ ...authLogin, [name]: value });
  };

  const handleSubmit = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: authLogin.email }));
  };

  const validation = async () => {
    const validate = await validationLogin.isValid(authLogin);
    setFormValidation(validate);
  };

  useEffect(() => {
    validation();
  });

  return (
    <S.Container>
      <S.BgImage src={ foodBackground } alt="background" />
      <S.Form>
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
