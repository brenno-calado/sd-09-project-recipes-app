// import React, { useEffect } from 'react';
import React from 'react';

export default function LoginForm() {
  // adicionei esse useEffect para testar o localStorage das receitas iniciadas

  // useEffect(() => {
  //   localStorage.setItem('inProgressRecipes', JSON.stringify([]));
  // }, []);

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" data-testid="email-input" />
        <input type="password" placeholder="Senha" data-testid="password-input" />
        <input type="submit" value="Entrar" data-testid="login-submit-btn" />
      </form>
    </div>
  );
}
