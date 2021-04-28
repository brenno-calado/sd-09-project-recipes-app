import React from 'react';

export default function LoginForm() {
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
