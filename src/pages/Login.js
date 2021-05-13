import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cooking from '../images/cooking.svg';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  handleClick() {
    const { email } = this.state;
    const loginData = ({ email });
    const { history } = this.props;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(loginData));
    history.push('/comidas');
  }

  render() {
    const { email, password } = this.state;
    const emailValidate = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    const passLength = 7;
    return (
      <div className="login">
        <div
          className="fade-in-fwd"
          style={
            { width: '100px',
              height: '100px' }
          }
        >
          <img
            className="front face"
            style={
              { width: '100px',
                height: '100px' }
            }
            src={ cooking }
            alt="teste"
          />
        </div>
        Login
        <input
          type="email"
          name="email"
          placeholder="Email"
          data-testid="email-input"
          pattern={ emailValidate }
          onChange={ this.handleChange }
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ this.handleChange }
          required
        />
        <button
          className="login-button"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !((emailValidate.test(email)) && (password.length >= passLength)) }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
