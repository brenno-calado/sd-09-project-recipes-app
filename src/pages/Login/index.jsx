import React from 'react';
import * as S from './styled';
import foodBackground from '../../images/foodbackground.png';

function Login() {
  return (
    <S.Container>
      <S.BgImage src={ foodBackground } alt="" />
      <S.Form>
        <input
          type="email"
          placeholder="Digite seu email"
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          data-testid="password-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          entrar
        </button>
      </S.Form>
    </S.Container>
  );
}

export default Login;
