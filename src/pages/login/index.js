import React, { Component } from 'react';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  render() {
    const { email, password } = this.state;
    const patternEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    const minPassLength = 6;
    return (
      <div>
        Login
        <input
          type="email"
          name="email"
          placeholder="Email"
          data-testid="email-input"
          pattern={ patternEmail }
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
          type="button"
          data-testid="login-submit-btn"
          disabled={ !((patternEmail.test(email)) && (password.length >= minPassLength)) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default index;
