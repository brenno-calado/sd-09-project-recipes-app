import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';
import searchIcon from '../images/searchIcon.svg';

const headerStyle = {
  margin: 'auto',
  position: 'fixed',
  top: '0px',
  // width: '100%',
  // display: 'flex',
  // justifyContent: 'space-between',
};

export default function Header(props) {
  const { title } = props;
  const [searchButton, setSearchButton] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  const handleClickSearchButton = () => {
    setSearchButton(!searchButton);
  };

  return (
    <header style={ headerStyle }>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
      </Link>
      <span data-testid="page-title">{title}</span>

      { (pathname === '/comidas' || pathname === '/bebidas'
      || pathname === '/explorar/comidas/area')
        && <input
          src={ searchIcon }
          type="image"
          data-testid="search-top-btn"
          onClick={ handleClickSearchButton }
          alt=""
        />}
      {searchButton ? <HeaderSearchBar /> : null}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
