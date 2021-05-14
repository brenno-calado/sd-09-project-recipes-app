import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GiCook } from 'react-icons/gi';
import { connect } from 'react-redux';
import { addUser, requestApiCocktails, requestApiMeals } from '../redux/actions';
import '../Styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.createLocalStorage = this.createLocalStorage.bind(this);
    this.btnEvent = this.btnEvent.bind(this);
  }

  componentDidUpdate() {
    this.btnEvent();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  checkMail(email) {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    return emailRegex.test(email);
  }

  checkPassword(password) {
    const min = 7;
    if (password.length >= min) {
      return true;
    }
  }

  validate() {
    const { password, email } = this.state;
    return this.checkPassword(password) && this.checkMail(email);
  }

  btnEvent() {
    if (this.validate()) {
      return 'enter effect';
    } return 'enter';
  }

  createLocalStorage() {
    const { email } = this.state;
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  }

  async clickHandler() {
    const { history, addUserInfo, getCocktails, getMeals } = this.props;
    const { email, password } = this.state;
    addUserInfo(email, password);
    this.createLocalStorage();
    await getCocktails();
    await getMeals();
    if (this.validate()) history.push('/comidas');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="loginPage">
        <p className="loginTitle">Your Wish Our Dish</p>
        <div className="btnContainer">
          <input
            className="inputMail"
            name="email"
            type="email"
            value={ email }
            data-testid="email-input"
            placeholder="E-mail"
            onChange={ this.handleChange }
          />
          <input
            className="inputPass"
            name="password"
            type="text"
            value={ password }
            data-testid="password-input"
            placeholder="Password"
            onChange={ this.handleChange }
          />
          <Link className="newAcc" to="/cadastro"> Cadastre-se </Link>
          <button
            className="loginBtn"
            name="login-btn"
            type="button"
            data-testid="login-submit-btn"
            onClick={ this.clickHandler }
            disabled={ !this.validate() }
          >
            <GiCook />
            <span className={ this.btnEvent() }>Entrar</span>
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  addUserInfo: PropTypes.func.isRequired,
  getMeals: PropTypes.func.isRequired,
  getCocktails: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addUserInfo: (email, password) => dispatch(addUser(email, password)),
  getMeals: () => dispatch(requestApiMeals()),
  getCocktails: () => dispatch(requestApiCocktails()),
});

export default connect(null, mapDispatchToProps)(Login);
