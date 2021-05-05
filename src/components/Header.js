import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';
import searchIcon from '../images/searchIcon.svg';
import '../css/Header.css';

export default function Header(props) {
  const { title } = props;
  const [searchButton, setSearchButton] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  const handleClickSearchButton = () => {
    setSearchButton(!searchButton);
  };

  return (
    <div>
      <header>
        <Link to="/perfil" className="header-link">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
        </Link>
        <span data-testid="page-title" className="title">{title}</span>
        { (pathname === '/comidas' || pathname === '/bebidas'
        || pathname === '/explorar/comidas/area')
          ? (
            <input
              src={ searchIcon }
              type="image"
              data-testid="search-top-btn"
              onClick={ handleClickSearchButton }
              alt=""
            />
          ) : (<div />)}
      </header>
      {searchButton ? <HeaderSearchBar /> : null}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
