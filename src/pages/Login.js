import React from 'react';

export default function Login() {
  return (
    <div>
      <input type="email" data-testid="email-input" />
      <input type="email" data-testid="password-input" />
      <button type="button" data-testid="login-submit-btn">Entrar</button>
    </div>
  );
}
