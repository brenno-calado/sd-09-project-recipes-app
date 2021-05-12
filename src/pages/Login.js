import React from 'react';
import { Redirect } from 'react-router-dom';
import '../Style/Login/style.css';
import LogoTrybeChef from '../images/logotrybe.svg';
import IllustrationChef from '../images/illustration-chef.svg';

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
    const emailValidationRegExp = new RegExp(/^.+@[a-z]+(\.[a-z]{2,3}){1,2}$/g);
    return (
      (password.length > MIN_PASSWORD_LENGTH)
      && (emailValidationRegExp.test(email))
    );
  }

  render() {
    const { email, password, redirect } = this.state;
    return ((redirect) ? (<Redirect to="/comidas" />)
      : (
        <div className="login-container">
          <img className="img-logo-chef" src={ LogoTrybeChef } alt="Logo TryBeChef" />
          <img className="img-chef" src={ IllustrationChef } alt="Ilustração" />
          <form className="login-form" onSubmit={ this.onSubmit.bind(this) }>
            <label htmlFor="email-input">
              <input
                className="login-input"
                placeholder="Email"
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
              <input
                className="login-input"
                placeholder="Senha"
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
              className="login-btn"
              disabled={ !this.validate(email, password) }
              type="submit"
              data-testid="login-submit-btn"
            >
              Entrar
            </button>
          </form>
        </div>
      )
    );
  }
}

export default Login;
