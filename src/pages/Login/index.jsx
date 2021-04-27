import React from 'react';
import * as S from './styled';

function Login() {
  return (
    <S.Container>
      <S.Form>
        <input type="text" placeholder="Digite seu nome" />
      </S.Form>
    </S.Container>
  );
}

export default Login;
