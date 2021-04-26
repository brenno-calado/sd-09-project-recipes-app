import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const { email } = this.state;
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');

    localStorage.setItem('user', JSON.stringify({
      ...JSON.parse(localStorage.getItem('user')),
      email,
    }));
    this.setState({ redirect: true });
  }

  validate(email, password) {
    const MIN_PASSWORD_LENGTH = 6;
    const emailValidationRegExp = new RegExp(/\S+@\S+\.\S+/);
    return (
      (password.length > MIN_PASSWORD_LENGTH)
      && (emailValidationRegExp.test(email))
    );
  }

  render() {
    const { email, password, redirect } = this.state;
    return ((redirect) ? (<Redirect to="/comidas" />)
      : (
        <form ref={ this.formRef } onSubmit={ this.onSubmit.bind(this) }>
          <label htmlFor="email-input">
            Digite aqui o seu email
            <input
              id="email-input"
              type="email"
              data-testid="email-input"
              value={ email }
              onChange={ (event) => (
                this.setState({
                  email: event.target.value,
                })
              ) }
            />
          </label>
          <label htmlFor="password-input">
            Digite aqui uma senha
            <input
              id="password-input"
              type="password"
              minLength={ 6 }
              data-testid="password-input"
              value={ password }
              onChange={ (event) => (
                this.setState({
                  password: event.target.value,
                })
              ) }
            />
          </label>
          <button
            disabled={ !this.validate(email, password) }
            type="submit"
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
        </form>
      )
    );
  }
}

export default Login;
