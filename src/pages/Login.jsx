import React from 'react';
import { Link } from 'react-router-dom';
import recipeSVG from '../images/recipe.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisable: true,
      email: '',
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleEmailAndPassword = this.handleEmailAndPassword.bind(this);
  }

  handleEmailAndPassword(event) {
    const { email } = this.state;
    const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/;
    const senha = event.target.value.length;
    const senhaMinLength = 6;
    if (regex.test(email) && senha > senhaMinLength) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    const { email, buttonDisable } = this.state;
    return (
      <div className="meals">
        <h1 className="logo">Recipe App</h1>
        <img className="rocksGlass" src={ recipeSVG } alt="logo" type="image/svg+xml" />
        <input
          className="input"
          type="email"
          name="email"
          value={ email }
          data-testid="email-input"
          placeholder="email"
          onChange={ this.handleChangeEmail }
        />
        <input
          className="input"
          type="password"
          name="senha"
          data-testid="password-input"
          placeholder="senha"
          onChange={ this.handleEmailAndPassword }
        />
        <Link to="/comidas">
          <input
            className="button"
            type="button"
            value="Entrar"
            disabled={ buttonDisable }
            data-testid="login-submit-btn"
          />
        </Link>
      </div>
    );
  }
}

export default Login;
