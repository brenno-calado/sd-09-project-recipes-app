import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { divide } from 'lodash';

class Header extends React.Component {
  render() {
    const { titleHeader, id } = this.props;

    const headerComponent = () => {
      if (id === '0') {
        return (
          <header className="header">
            <Link to="/perfil">
              <img
                alt="profile"
                className="profile-btn"
                data-testid="profile-top-btn"
                src={ profileIcon }
              />
            </Link>
            <span
              data-testid="page-title"
              className="page-title"
            >
              { titleHeader }
            </span>
            <Link to="/">
              <img
                alt="search"
                className="search-btn"
                data-testid="search-top-btn"
                src={ searchIcon }
              />
            </Link>
          </header>
        );
      }
      return (
        <header className="header">
          <Link to="/perfil">
            <img
              alt="profile"
              className="profile-btn"
              data-testid="profile-top-btn"
              src={ profileIcon }
            />
          </Link>
          <span
            data-testid="page-title"
            className="page-title"
          >
            { titleHeader }
          </span>
        </header>
      );
    };

    return (
      <div>
        { headerComponent() }
        <div className="box-search">
          <input
            data-testid="search-input"
            placeholder="Buscar Receita"
            className="buscar-receita">  
          </input>
          <label>
            <input
              className="radio-btn-1"
              data-testid="ingredient-search-radio"
              type="radio">
            </input> Ingrediente
          </label>
          <label>
            <input
              className="radio-btn-2"
              data-testid="name-search-radio"
              type="radio">
            </input> Nome
          </label>
          <label>
            <input
              className="radio-btn-3"
              data-testid="first-letter-search-radio"
              type="radio">
            </input> Primeira letra
          </label>
          <button
            className="btn-buscar"
            data-testid="exec-search-btn"
          >
            Buscar
          </button>
        </div>  
      </div>

    )}
}

Header.propTypes = ({
  titleHeader: string,
  id: string,
}).isRequired;

export default Header;
