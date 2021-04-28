import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as S from './styled';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import SearchFilters from '../SearchFilters';

export default function Header({ title, canFind }) {
  const [searchFilters, setSearchFilters] = useState(false);

  const handleFilters = () => {
    setSearchFilters(!searchFilters);
  };

  return (
    <>
      <S.Header>
        <Link to="/perfil">
          <S.ProfileImg
            data-testid="profile-top-btn"
            src={ ProfileIcon }
            alt="profile-button"
          />
        </Link>
        <span data-testid="page-title">{title}</span>
        {
          canFind
          && (
            <S.SearchButton
              onClick={ handleFilters }
              bgColor={ searchFilters ? '#82fa3d' : '#c3fff2' }
            >
              <img
                src={ SearchIcon }
                alt="search-icon"
                data-testid="search-top-btn"
              />
            </S.SearchButton>
          )
        }
      </S.Header>
      { searchFilters && <SearchFilters /> }
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  canFind: PropTypes.bool,
};

Header.defaultProps = {
  canFind: false,
};
