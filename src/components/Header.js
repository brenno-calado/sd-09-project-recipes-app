import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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

    return headerComponent();
  }
}

Header.propTypes = ({
  titleHeader: string,
  id: string,
}).isRequired;

export default Header;
