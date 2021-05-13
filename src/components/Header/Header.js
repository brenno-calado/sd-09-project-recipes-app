import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import SearchBar from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import styles from './style.module.scss';

function Header({ title, search }) {
  const [shouldSearch, setShouldSearch] = useState(false);

  const renderImage = (testid, src, alt) => (
    <img
      data-testid={ testid }
      src={ src }
      alt={ alt }
      className={ styles.icon }
    />
  );

  return (
    <header className="bg-orange-primary">
      <section className="d-flex align-items-center justify-content-between p-2">
        <Link to="/perfil">
          { renderImage('profile-top-btn', profileIcon, 'profile icon') }
        </Link>

        <h1 className={ styles.pageTitle } data-testid="page-title">{ title }</h1>

        { search && (
          <button
            type="button"
            onClick={ () => setShouldSearch(!shouldSearch) }
            className={ styles.buttonSearch }
          >
            { renderImage('search-top-btn', searchIcon, 'search icon')}
          </button>) }
      </section>

      { search && shouldSearch
        ? <SearchBar isMeal={ title === 'Comidas' } /> : null }
    </header>
  );
}

Header.propTypes = { title: string }.isRequired;

export default Header;
